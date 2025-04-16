import sql from '../db';

const cardSelect = sql`
  cards.id,
  json_build_object('id', cards.user_id, 'name', users.username) as "user", 
  json_build_object('id', templates.id, 'name', templates.name) as "template",
  bool_and(cards.archived) AS "archived", 
  jsonb_agg(
    json_build_object(
      'id', card_squares.id, 
      'req', template_reqs.req, 
      'book', card_squares.book, 
      'color', card_squares.color
    ) ORDER BY card_squares.id
  ) AS squares`;

const cardFrom = sql`
  ((((bingo.cards INNER JOIN bingo.users ON cards.user_id = users.id)
  INNER JOIN bingo.templates ON cards.template_id = templates.id) 
  INNER JOIN bingo.card_squares ON cards.id = card_squares.card_id)
  INNER JOIN bingo.template_reqs ON cards.template_id = template_reqs.template_id AND card_squares.id = template_reqs.id)
`;

/**
 * Get a list of up to 10 cards and number of pages of cards
 */
export async function getCards({
  page = 1,
  userIds = [],
  archived = false,
}: CardsFilters): Promise<{ cards: Card[]; pageCount: number }> {
  const offsetValue = (page - 1) * 10;
  const filterUser = userIds && userIds.length > 0;
  const userFilter = sql`AND cards.user_id IN ${sql(userIds)}`;
  const cards = await sql<Card[]>`
    SELECT ${cardSelect}
    FROM ${cardFrom}
    WHERE cards.archived = ${archived} ${filterUser ? userFilter : sql``}
    GROUP BY cards.id, users.username, templates.name, templates.id
    ORDER BY cards.created_at ASC
    LIMIT 10
    OFFSET ${offsetValue}`;

  const totalCardCount = await getCardCount({ page, userIds, archived });

  const pageCount = Math.ceil(totalCardCount / 10);

  return { cards, pageCount };
}

/**
 * Returns the total count of cards that satisfy the given filters
 */
export async function getCardCount({
  userIds = [],
  archived = false,
}: CardsFilters): Promise<number> {
  const filterUser = userIds && userIds.length > 0;
  const userFilter = sql`AND cards.user_id IN ${sql(userIds)}`;
  const cardCount = await sql`
    SELECT count(*)
    FROM bingo.cards
    WHERE cards.archived = ${archived} ${filterUser ? userFilter : sql``}`;
  return cardCount[0].count;
}

/**
 * Gets a single card by ID
 */
export async function getCardById(card_id: string): Promise<Card> {
  const cardResult = await sql<Card[]>`
    SELECT ${cardSelect}
    FROM ${cardFrom}
    WHERE cards.id = ${card_id}
    GROUP BY users.username, templates.name, cards.created_at
    ORDER BY cards.created_at DESC`;

  return cardResult[0];
}

/**
 * Gets the number of cards that a user has
 * @param user_id
 */
export async function getUserCardCount(user_id: string): Promise<number> {
  const cardCount = await sql`
    SELECT count(*)
    FROM bingo.cards
    WHERE cards.user_id = ${user_id}`;

  return cardCount[0].count;
}

/**
 * Insert a card into the database
 * @param user_id ID of the user creating the new card
 * @param template_id ID of template to base the card on
 * @returns the new cards ID
 */
export async function insertCard(
  user_id: string,
  template_id: string,
): Promise<string> {
  const insertCard = await sql`
    INSERT INTO bingo.cards(id, user_id, template_id, archived, created_at) VALUES
    (gen_random_uuid(), ${user_id}, ${template_id}, false, NOW())
    returning id`;

  const { id: card_id } = insertCard[0];
  const values: { id: number; card_id: string }[] = [];
  for (let i = 0; i < 25; i++) {
    values.push({ id: i, card_id: card_id });
  }

  await sql`
    INSERT INTO bingo.card_squares ${sql(values)}
  `;

  return card_id;
}

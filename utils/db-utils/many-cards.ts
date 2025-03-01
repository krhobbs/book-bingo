import sql from '../db';

interface GetCardsProps {
  pageNumber?: number;
  userIds?: string[];
  archived?: boolean;
}

export async function getCards({
  pageNumber = 1,
  userIds = [],
  archived = false,
}: GetCardsProps) {
  const offsetValue = (pageNumber - 1) * 10;
  const filterUser = userIds && userIds.length > 0;
  const userFilter = sql`AND cards.user_id IN ${sql(userIds)}`;
  const cards = await sql<Card[]>`
    SELECT cards.id as "_id", cards.user_id, users.username as "user", templates.name AS "template", bool_and(cards.archived) AS "archived", jsonb_agg(json_build_object('id', card_squares.id, 'req', template_reqs.req, 'book', card_squares.book, 'color', card_squares.color) ORDER BY card_squares.id) AS squares
    FROM ((((bingo.cards INNER JOIN bingo.users ON cards.user_id = users.id)
        INNER JOIN bingo.templates ON cards.template_id = templates.id) 
        INNER JOIN bingo.card_squares ON cards.id = card_squares.card_id)
        INNER JOIN bingo.template_reqs ON cards.template_id = template_reqs.template_id AND card_squares.id = template_reqs.id)
    WHERE cards.archived = ${archived} ${filterUser ? userFilter : sql``}
    GROUP BY cards.id, users.username, templates.name
    ORDER BY cards.created_at ASC
    LIMIT 10
    OFFSET ${offsetValue}`;

  const pageCount = Math.ceil(cards.count / 10);

  return { cards, pageCount };
}

// gets all the cards of a particular user, either archived or not archived (default)
// used for the profile page and archived page
export async function getCardsOfUser(
  user_id: string,
  archived = false,
  pageNumber = 1,
): Promise<[Card[], number]> {
  const offsetValue = (pageNumber - 1) * 10;
  const cards = await sql<Card[]>`
    SELECT cards.id AS "_id", cards.user_id, users.username AS "user", bool_and(cards.archived) AS "archived", templates.name AS "template", jsonb_agg(json_build_object('id', card_squares.id, 'req', template_reqs.req, 'book', card_squares.book, 'color', card_squares.color) ORDER BY card_squares.id) AS squares
    FROM ((((bingo.cards INNER JOIN bingo.users ON cards.user_id = users.id)
        INNER JOIN bingo.templates ON cards.template_id = templates.id) 
        INNER JOIN bingo.card_squares ON cards.id = card_squares.card_id)
        INNER JOIN bingo.template_reqs ON cards.template_id = template_reqs.template_id AND card_squares.id = template_reqs.id)
    WHERE cards.archived = ${archived} AND cards.user_id = ${user_id}
    GROUP BY users.username, templates.name, cards.created_at, cards.id
    ORDER BY cards.created_at DESC
    LIMIT 10
    OFFSET ${offsetValue}`;

  const cardCount = await sql`
    SELECT count(*) 
    FROM bingo.cards
    WHERE cards.user_id = ${user_id} AND cards.archived = ${archived}`;

  const pageCount = Math.ceil(cardCount[0].count / 10);

  return [cards, pageCount];
}

// gets all the cards of a set of users that are not archived
// used for the friends page
export async function getCardsOfUsers(user_ids: string[], pageNumber = 1) {
  const offsetValue = (pageNumber - 1) * 10;
  const cards = await sql<Card[]>`
    SELECT cards.id AS "_id", cards.user_id, users.username AS "user", bool_and(cards.archived) AS "archived", templates.name AS "template", jsonb_agg(json_build_object('id', card_squares.id, 'req', template_reqs.req, 'book', card_squares.book, 'color', card_squares.color) ORDER BY card_squares.id) AS squares
    FROM ((((bingo.cards INNER JOIN bingo.users ON cards.user_id = users.id)
        INNER JOIN bingo.templates ON cards.template_id = templates.id) 
        INNER JOIN bingo.card_squares ON cards.id = card_squares.card_id)
        INNER JOIN bingo.template_reqs ON cards.template_id = template_reqs.template_id AND card_squares.id = template_reqs.id)
    WHERE NOT cards.archived AND cards.user_id IN ${sql([...user_ids])}
    GROUP BY users.username, templates.name, cards.created_at, cards.id
    ORDER BY cards.created_at DESC
    LIMIT 10
    OFFSET ${offsetValue}`;

  const cardCount = await sql`
    SELECT count(*) 
    FROM bingo.cards
    WHERE cards.user_id IN ${sql([...user_ids])} AND NOT cards.archived`;

  const pageCount = Math.ceil(cardCount[0].count / 10);

  return [cards, pageCount];
}

export async function getUserCardCount(user_id: string): Promise<number> {
  const cardCount = await sql`
    SELECT count(*)
    FROM bingo.cards
    WHERE cards.user_id = ${user_id}`;

  return cardCount[0].count;
}

import sql from '../db';

export async function getCards({
  page = 1,
  userIds = [],
  archived = false,
}: CardsFilters): Promise<{ cards: Card[]; pageCount: number }> {
  const offsetValue = (page - 1) * 10;
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

export async function getUserCardCount(user_id: string): Promise<number> {
  const cardCount = await sql`
    SELECT count(*)
    FROM bingo.cards
    WHERE cards.user_id = ${user_id}`;

  return cardCount[0].count;
}

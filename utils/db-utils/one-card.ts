import sql from '../db';

// adds a new card by insterting a record into the cards table and 25 records into the card_squares table
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

// updates a card record, by toggling the archived column to either archive or unarchive a card
export async function toggleArchiveCard(card_id: string, archived: boolean) {
  await sql`
    UPDATE bingo.cards SET archived = ${!archived} WHERE id = ${card_id}`;
}

// deletes a cards record, deletes the corresponding card_squares record
export async function deleteCard(card_id: string) {
  await sql`
    DELETE FROM bingo.card_squares WHERE card_id = ${card_id}`;

  await sql`
    DELETE FROM bingo.cards WHERE id = ${card_id}`;
}

// takes a card_id and returns data conforming to the Card type
export async function getCardById(card_id: string) {
  const cardResult = await sql`
    SELECT users.username AS "user", cards.user_id, bool_and(cards.archived) AS "archived", templates.name AS "template", jsonb_agg(json_build_object('id', card_squares.id, 'req', template_reqs.req, 'book', card_squares.book, 'color', card_squares.color)) AS squares
    FROM ((((bingo.cards INNER JOIN bingo.users ON cards.user_id = users.id)
        INNER JOIN bingo.templates ON cards.template_id = templates.id) 
        INNER JOIN bingo.card_squares ON cards.id = card_squares.card_id)
        INNER JOIN bingo.template_reqs ON cards.template_id = template_reqs.template_id AND card_squares.id = template_reqs.id)
    WHERE cards.id = ${card_id}
    GROUP BY users.username, templates.name, cards.created_at
    ORDER BY cards.created_at DESC`;

  return cardResult[0];
}

// updates the corresponding square from card_squares table with new value for book, color, and completed_at
export async function updateCardSquare(card_id: string, square: Square) {
  const bookJSON = square.book ? JSON.stringify(square.book) : null;
  const color = square.color ? square.color : null;
  const completed = square.book ? true : false;

  await sql`
    UPDATE bingo.card_squares SET (book, color, completed_at) = (${bookJSON ? sql`${bookJSON}::text::jsonb` : sql`NULL`}, ${color}, ${completed ? sql`NOW()` : sql`NULL`})
    WHERE id = ${parseInt(square.id)} AND card_id = ${card_id}
  `;
}

// get a single square from a card, fits into the client side Square type
export async function getSquareOfCard(card_id: string, square_id: number) {
  const squareResult = await sql`
    SELECT card_squares.id::text, template_reqs.req, card_squares.book, card_squares.color
    FROM (((bingo.cards INNER JOIN bingo.card_squares ON cards.id = card_squares.card_id)
        INNER JOIN bingo.templates ON cards.template_id = templates.id)
        INNER JOIN bingo.template_reqs ON templates.id = template_reqs.template_id AND card_squares.id = template_reqs.id)
    WHERE cards.id = ${card_id} AND card_squares.id = ${square_id}`;

  return squareResult[0];
}

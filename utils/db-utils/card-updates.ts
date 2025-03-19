import sql from '../db';

/**
 * Set the archived column of a single card record
 */
export async function setCardArchived(card_id: string, archived: boolean) {
  await sql`
    UPDATE bingo.cards SET archived = ${archived} WHERE id = ${card_id}`;
}

// deletes a cards record, deletes the corresponding card_squares record
export async function deleteCard(card_id: string) {
  await sql`
    DELETE FROM bingo.card_squares WHERE card_id = ${card_id}`;

  await sql`
    DELETE FROM bingo.cards WHERE id = ${card_id}`;
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

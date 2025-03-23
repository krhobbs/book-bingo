import { updateCard } from './fetchers';

export async function updateCardSquare(
  cards: Card[],
  squareId: string,
  cardId: string,
  book?: Book,
  color?: string,
): Promise<[Card, Card[]]> {
  const activeCard: Card = cards.filter((c: Card) => c.id === cardId)[0];
  const otherCards: Card[] = cards.filter((c: Card) => c.id !== cardId);

  activeCard.squares[parseInt(squareId)] = {
    ...activeCard.squares[parseInt(squareId)],
    color: color,
    book: book,
  };

  await updateCard(cardId, undefined, activeCard.squares[parseInt(squareId)]);

  return [activeCard, otherCards];
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'An unknown error occurred.';
}

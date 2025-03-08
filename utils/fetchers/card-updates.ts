import type { KeyedMutator } from 'swr';

export async function updateCardSquare(
  cards: Card[],
  squareId: string,
  cardId: string,
  mutate: KeyedMutator<{ cards: Card[]; pageCount: number }>,
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

  await fetch(`/api/cards/${cardId}`, {
    method: 'PUT',
    body: JSON.stringify({ square: activeCard.squares[parseInt(squareId)] }),
    headers: { 'Content-Type': 'application/json' },
  });

  return [activeCard, otherCards];
}

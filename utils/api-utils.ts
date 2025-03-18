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

export async function setUsername(
  username: string,
  identifier: string,
  provider: 'reddit' | 'google',
) {
  try {
    await fetch('/api/auth/set-user', {
      method: 'POST',
      body: JSON.stringify({ username, identifier, provider }),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return;
  }
}

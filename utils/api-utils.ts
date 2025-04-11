import { KeyedMutator } from 'swr';
import { createCard, updateCard } from './fetchers';

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'An unknown error occurred.';
}

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

  try {
    await updateCard(cardId, undefined, activeCard.squares[parseInt(squareId)]);
  } catch (error) {
    throw error as Error;
  }

  return [activeCard, otherCards];
}

/**
 * This function calls the API for creating a new card, mutates local data
 */
export async function addCard({
  templateID,
  templateName,
  templateReqs,
  userID,
  username,
  cards,
  mutate,
}: {
  templateID: string;
  templateName: string;
  templateReqs: string[];
  userID: string;
  username: string;
  cards: Card[];
  mutate: KeyedMutator<{ cards: Card[]; pageCount: number }>;
}): Promise<void> {
  const cardId = await createCard(templateID);

  const newCard: Card = {
    id: cardId,
    user: {
      id: userID,
      name: username,
    },
    template: {
      id: templateID,
      name: templateName,
    },
    archived: false,
    squares: templateReqs.map((req, idx) => {
      return {
        id: `${idx}`,
        req: req,
        book: undefined,
        color: undefined,
      } as Square;
    }),
  };

  const newCards = [newCard, ...cards];
  const newPageCount = Math.ceil((newCards.length + 1) / 10);
  mutate({ cards: newCards, pageCount: newPageCount });
}

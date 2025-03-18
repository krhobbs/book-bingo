import { KeyedMutator } from 'swr';

export async function fetchCards(url: string) {
  const response = await fetch(url);

  const { cards, pageCount } = (await response.json()) as {
    cards: Card[];
    pageCount: number;
  };
  return { cards, pageCount };
}

export async function createCard(templateID: string) {
  const response = await fetch('/api/cards', {
    method: 'POST',
    body: JSON.stringify({ templateID }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
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
  const response = await fetch('/api/cards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ templateID }),
  });
  const { cardId } = await response.json();

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

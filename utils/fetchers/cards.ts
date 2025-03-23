import { KeyedMutator } from 'swr';

/**
 * Fetches a page worth of cards and total pages of cards
 */
export async function fetchCards(url: string) {
  const response = await fetch(url);

  const { cards, pageCount } = (await response.json()) as {
    cards: Card[];
    pageCount: number;
  };
  return { cards, pageCount };
}

/**
 * Creates a card based on a template for the logged in user
 * @param templateID
 * @returns the new card's ID
 */
export async function createCard(templateID: string): Promise<string> {
  const response = await fetch('/api/cards', {
    method: 'POST',
    body: JSON.stringify({ templateID }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { cardID } = await response.json();

  return cardID;
}

/**
 * Deletes a card for the logged in user
 * @param cardID
 */
export async function deleteCard(cardID: string) {
  await fetch(`/api/cards/${cardID}`, {
    method: 'DELETE',
  });
}

/**
 * Updates a card for the logged in user
 * @param cardID
 * @param archived
 * @param square
 */
export async function updateCard(
  cardID: string,
  archived?: boolean,
  square?: Square,
) {
  await fetch(`/api/cards/${cardID}`, {
    method: 'PUT',
    body: JSON.stringify({ archived, square }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
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

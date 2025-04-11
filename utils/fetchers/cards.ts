/**
 * Fetches a page worth of cards and total pages of cards
 */
export async function fetchCards(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Unable to retrieve cards.');
  }

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

  if (!response.ok) {
    throw new Error('Unable to retrieve cards.');
  }

  const { cardID } = await response.json();

  return cardID;
}

/**
 * Deletes a card for the logged in user
 * @param cardID
 */
export async function deleteCard(cardID: string) {
  const response = await fetch(`/api/cards/${cardID}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Unable to retrieve cards.');
  }
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
  const response = await fetch(`/api/cards/${cardID}`, {
    method: 'PUT',
    body: JSON.stringify({ archived, square }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Unable to retrieve cards.');
  }
}

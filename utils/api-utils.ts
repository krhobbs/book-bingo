export async function deleteCard() {}

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

  await fetch(`/api/cards/${cardId}`, {
    method: 'PUT',
    body: JSON.stringify({ square: activeCard.squares[parseInt(squareId)] }),
    headers: { 'Content-Type': 'application/json' },
  });

  return [activeCard, otherCards];
}

// Template Related API Utils
export async function createTemplate(name: string, reqs: string[]) {
  return await fetch('api/template/new', {
    method: 'POST',
    body: JSON.stringify({ name: name, reqs: reqs }),
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function fetchTemplates(url: string) {
  try {
    const response = await fetch(url);
    const data: Template[] = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function fetchTemplateNames(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
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

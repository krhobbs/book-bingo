// Card Related API Utils
export async function fetchCards(url: string) {
  try {
    const response = await fetch(url);
    const { cards, pageCount } = (await response.json()) as {
      cards: Card[];
      pageCount: number;
    };
    return { cards, pageCount };
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function addCard(
  username: string,
  userId: string,
  template: Template,
): Promise<Card> {
  const card = {
    user: username,
    template: template.name,
    archived: false,
    squares: template.reqs.map((req, idx) => {
      return {
        id: `${idx}`,
        req: req,
        book: undefined,
        color: undefined,
      } as Square;
    }),
  };

  try {
    const response = await fetch('/api/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ templateID: template._id }),
    });
    const data = await response.json();

    return { _id: data._id, user_id: userId, ...card };
  } catch (error) {
    console.log(error);
    throw new Error('Unable to create new card.');
  }
}

export async function deleteCard() {}

export async function updateCardSquare(
  cards: Card[],
  squareId: string,
  cardId: string,
  book?: Book,
  color?: string,
): Promise<[Card, Card[]]> {
  const activeCard: Card = cards.filter((c: Card) => c._id === cardId)[0];
  const otherCards: Card[] = cards.filter((c: Card) => c._id !== cardId);

  activeCard.squares[parseInt(squareId)] = {
    ...activeCard.squares[parseInt(squareId)],
    color: color,
    book: book,
  };

  await fetch(`/api/cards/${cardId}`, {
    method: 'PUT',
    body: JSON.stringify({ ...activeCard.squares[parseInt(squareId)] }),
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

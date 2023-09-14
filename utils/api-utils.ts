export async function fetchCards() {
  try {
    const response = await fetch('/api/cards');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function fetchUsersCards(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function fetchFriendsCards(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
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

export async function addCard(username: string, template: Template) {
  const card = {
    user: username,
    template: template.name,
    archived: false,
    squares: template.reqs.map((req, idx) => {
      return {
        id: `${idx}`,
        req: req,
        book: null,
        color: null,
      } as Square;
    }),
  };

  try {
    const response = await fetch('/api/card/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card),
    });
    const data = await response.json();

    return { _id: data._id, ...card };
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function deleteCard() {}

export async function updateCardSquare(
  book: Book,
  color: string,
  cards: Card[],
  squareId: string,
  cardId: string
) : Promise<[ Card, Card[]]> {
  const activeCard: Card = cards.filter((c: Card) => c._id === cardId)[0];
  const otherCards: Card[] = cards.filter((c: Card) => c._id !== cardId);

  activeCard.squares[parseInt(squareId)] = {
    ...activeCard.squares[parseInt(squareId)],
    color: color,
    book: book,
  };

  const response = await fetch(`/api/card/${cardId}/add-book`, {
    method: 'POST',
    body: JSON.stringify({
      ...activeCard.squares[parseInt(squareId)],
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  return [ activeCard, otherCards ];
}

// Card Related API Utils
export async function fetchCards(url: string) {
  try {
    const response = await fetch(url);
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
      body: JSON.stringify({templateID: template._id}),
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

  await fetch(`/api/card/${cardId}/update-square`, {
    method: 'POST',
    body: JSON.stringify({
      ...activeCard.squares[parseInt(squareId)],
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return [ activeCard, otherCards ];
}

// Template Related API Utils
export async function createTemplate(name: string, reqs: string[]) {
  return await fetch('api/template/new', {
    method: 'POST',
    body: JSON.stringify({ name: name, reqs: reqs }),
    headers: {
      'Content-Type': 'application/json',
    }
  });  
}

export async function fetchTemplates() {
  try {
    const response = await fetch('api/templates');
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

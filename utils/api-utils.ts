
export async function getUser(username: string) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_HOST + '/api/users/' + username);
    const data = await response.json();

    return data.user;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getCard(cardId: string) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_HOST + '/api/cards/' + cardId);
    const data = await response.json();

    return data.card;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getCards() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_HOST + '/api/cards');
    const data = await response.json();
    const cards = data.cards;

    return cards;
  } catch (error) {
    console.log(error);
    return;
  }

}

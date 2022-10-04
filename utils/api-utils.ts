export async function getBooks() {
  try {
    const response = await fetch('http://localhost:3000/api/books');
    const data = await response.json();
    const books = data.books;

    return books;
  } catch (error) {
    console.log(error);
    return;
  }
  
}

export async function getUser(username: string) {
  try {
    const response = await fetch('http://localhost:3000/api/users/' + username);
    const data = await response.json();

    return data.user;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getCard(cardId: string) {
  try {
    const response = await fetch('http://localhost:3000/api/cards/' + cardId);
    const data = await response.json();

    return data.card;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getCards() {
  try {
    const response = await fetch('http://localhost:3000/api/cards');
    const data = await response.json();
    const cards = data.cards;

    return cards;
  } catch (error) {
    console.log(error);
    return;
  }

}

export async function getCardBooks(cardId: string) {
  try {
    const card = await getCard(cardId);

  } catch (error) {
    console.log(error);
    return;
  }
}
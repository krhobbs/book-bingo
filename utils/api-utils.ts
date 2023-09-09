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

export async function addCard(card: {
  user: string;
  template: string;
  archived: boolean;
  squares: Square[];
}) {
  try {
    const response = await fetch('/api/card/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card),
    });
    const data = await response.json();

    return data._id;
  } catch (error) {
    console.log(error);
    return;
  }
}

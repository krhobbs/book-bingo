export async function fetchCards(url: string) {
  const response = await fetch(url);
  const { cards, pageCount } = (await response.json()) as {
    cards: Card[];
    pageCount: number;
  };
  return { cards, pageCount };
}

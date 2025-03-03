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

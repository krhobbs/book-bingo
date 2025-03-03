/**
 * Calls the API endpoint to add a new card into the database
 * @param username
 * @param userId
 * @param template
 * @returns
 */
export async function addCard(
  username: string,
  userId: string,
  template: Template,
): Promise<Card> {
  const card = {
    template: {
      id: template._id,
      name: template.name,
    },
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

    return { _id: data._id, user: { id: userId, name: username }, ...card };
  } catch (error) {
    console.log(error);
    throw new Error('Unable to create new card.');
  }
}

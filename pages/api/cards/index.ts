import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllCards } from '../../../utils/db-utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

function putUsersCardFirst(cards: Card[], username: string) {
  const usersCards: number[] = cards.reduce(
    (acc, card, idx) => (
      card.user === username && acc.push(idx), acc
    ),
    []
  );

  usersCards.forEach((idx) => {
    cards.unshift(cards.splice(idx, 1)[0]);
  });
  return cards;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const [cards] = await getAllCards(page);

    const session = await getServerSession(req, res, authOptions);
    let sortedCards: Card[];
    if (session) {
      sortedCards = putUsersCardFirst(cards, session.user.username);
    }
    
    res.status(200).json(cards);
  } catch (e) {
    res
      .status(422)
      .json({ message: 'Unable to connect to database. Try again later.' });
    return;
  }
}

export default handler;

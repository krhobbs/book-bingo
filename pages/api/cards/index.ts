import type { NextApiRequest, NextApiResponse } from 'next';
import {
  checkUserPermission,
  getCards,
  getUserCardCount,
  insertCard,
} from '../../../utils/db-utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import {
  paramToBoolean,
  paramToNumber,
  paramToArray,
} from '../../../utils/param-utils';

// function putUsersCardFirst(cards: Card[], userId: string) {
//   const usersCards: number[] = cards.reduce(
//     (acc, card, idx) => (card.user_id === userId && acc.push(idx), acc),
//     [],
//   );

//   usersCards.forEach((idx) => {
//     cards.unshift(cards.splice(idx, 1)[0]);
//   });
//   return cards;
// }

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const {
      page: pageParam,
      user_id: userParam,
      archived: archivedParam,
    } = req.query;

    const page = paramToNumber(pageParam) ?? 1;
    const userIds = paramToArray(userParam) ?? [];
    const archived = paramToBoolean(archivedParam) ?? false;
    try {
      const { cards, pageCount } = await getCards({
        page,
        userIds,
        archived,
      });
      return res.status(200).json({ cards: cards, pageCount: pageCount });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch cards.' });
    }
  }

  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    const { templateID } = req.body;

    if (!session) {
      return res.status(401).json({ message: 'Not authenticated.' });
    }

    const userID = session.user.id;

    try {
      const cardCount = await getUserCardCount(userID);

      if (cardCount >= 3) {
        const allowed = await checkUserPermission(userID, 'unlimited_cards');
        if (!allowed) {
          return res
            .status(401)
            .json({ message: 'Not allowed to make more than 3 cards.' });
        }
      }

      const cardResult = await insertCard(userID, templateID);

      return res
        .status(200)
        .json({ cardId: cardResult, message: `Inserted card ${cardResult}` });
    } catch (error) {
      return res.status(500).json({ message: 'Unable to create card.' });
    }
  }
}

export default handler;

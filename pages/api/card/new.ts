import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import {
  insertCard,
  getUserCardCount,
  checkUserPermission,
} from '../../../utils/db-utils';
import { authOptions } from '../auth/[...nextauth]';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return;
  }

  const session = await getServerSession(req, res, authOptions);
  const { templateID } = req.body;

  // Make sure the user is authenticated
  if (!session) {
    res.status(401).json({ message: 'Not authenticated.' });
    return;
  }

  const userID = session.user.id;

  try {
    const cardCount = await getUserCardCount(userID);

    if (cardCount >= 3) {
      const allowedMore = await checkUserPermission(userID, 'unlimited_cards');
      if (!allowedMore) {
        res
          .status(401)
          .json({ message: 'Not allowed to make more than 3 cards.' });
        return;
      }
    }

    const cardResult = await insertCard(userID, templateID);

    res.status(200).json({ _id: cardResult });
  } catch (error) {
    res.status(422).json({ message: error });
    return;
  }
}

export default handler;

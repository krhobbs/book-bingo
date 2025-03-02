import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getCardById,
  deleteCard,
  toggleArchiveCard,
  updateCardSquare,
  isUsersCard,
} from '../../../../utils/db-utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { paramToString } from '../../../../utils/param-utils';

function validateSquare(square: any): square is Square {
  return (
    typeof square.id === 'number' &&
    typeof square.color === 'string' &&
    typeof square.book.title === 'string' &&
    typeof square.book.author === 'string'
  );
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cardId = paramToString(req.query.card_id);
  if (!cardId) {
    return res.status(400);
  }
  if (req.method === 'GET') {
    try {
      const card = await getCardById(cardId);
      return res.status(200).json({ card });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch cards.' });
    }
  }

  if (req.method === 'PUT' || req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions);

    // Make sure the user is authenticated
    if (!session) {
      return res.status(401).json({ message: 'Not authenticated.' });
    }

    const usersCard = isUsersCard(session.user.id, cardId);
    if (!usersCard) {
      return res
        .status(403)
        .json({ message: 'Can only modify your own card.' });
    }

    if (req.method === 'PUT') {
      const { archived, square } = req.body;

      if (typeof archived === 'boolean') {
        await toggleArchiveCard(cardId, archived);
        return res
          .status(200)
          .json({ message: 'Toggled archive status of card.' });
      }

      if (validateSquare(square)) {
        await updateCardSquare(cardId, square);
        return res.status(200).json({ message: 'Added book.' });
      }
    }

    if (req.method === 'DELETE') {
      try {
        await deleteCard(cardId);
        res.status(200).json({ message: `Deleted card ${cardId}.` });
      } catch (error) {
        return res
          .status(422)
          .json({ message: 'Unable to connect to database. Try again later.' });
      }
    }
  }
}

export default handler;

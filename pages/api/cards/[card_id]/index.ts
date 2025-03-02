import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getCardById,
  deleteCard,
  toggleArchiveCard,
  updateCardSquare,
} from '../../../../utils/db-utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { paramToString } from '../../../../utils/param-utils';

function validateSquare(square: any): square is Square {
  return (
    typeof square.id === 'string' &&
    typeof square.color === 'string' &&
    typeof square.book.title === 'string' &&
    typeof square.book.author === 'string' &&
    square.book.cover
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

  if (req.method === 'PUT') {
    const { archived, square } = req.body;

    if (typeof archived === 'boolean') {
      await toggleArchiveCard(cardId, archived);
    }

    if (validateSquare(square)) {
      await updateCardSquare(cardId, square);
    }
  }

  if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions);

    // Make sure the user is authenticated
    if (!session) {
      return res.status(401).json({ message: 'Not authenticated.' });
    }

    try {
      if (!cardId) {
        return res.status(400).json({ message: 'Invalid request.' });
      }
      await deleteCard(cardId);
      res.status(200).json({ message: `Deleted card ${cardId}.` });
    } catch (error) {
      return res
        .status(422)
        .json({ message: 'Unable to connect to database. Try again later.' });
    }
  }
}

export default handler;

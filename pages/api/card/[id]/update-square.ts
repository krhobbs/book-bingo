import type { NextApiRequest, NextApiResponse } from 'next';
import { updateCardSquare, isUsersCard } from '../../../../utils/db-utils';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const id: string = req.query.id as string;
    const { id: square, book, color } = req.body;

    const session = await getServerSession(req, res, authOptions);

    // Make sure the user is authenticated
    if (!session) {
      res.status(401).json({ message: 'Not authenticated.' });
      return;
    }

    try {
      // make sure the authenticated user owns the card that is being updated
      const usersCard = await isUsersCard(session.user.id, id);
      if (!usersCard) {
        throw Error('This is not your card.');
      }
      await updateCardSquare(id, {id: square, req: '', book: book, color: color})
    } catch (error) {
      res
        .status(422)
        .json({ message: 'Unable to connect to database. Try again later.' });
      return;
    }

    res.status(201).json({ message: 'Book Added!' });
  }
}

export default handler;

import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { connectDatabase } from '../../../utils/db-utils';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return;
  }

  const { cardId } = req.body;

  const session = await getServerSession(req, res, authOptions);

  // Make sure the user is authenticated
  if (!session) {
    res.status(401).json({ message: 'Not authenticated.' });
    return;
  }

  const username = session.user.username;

  try {
    const client = await connectDatabase();
    const usersCollection = client.db().collection('users');
    const cardsCollection = client.db().collection('cards');

    const user = await usersCollection.findOne({ username: username });

    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    await cardsCollection.deleteOne({ _id: new ObjectId(cardId) });

    client.close();
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Unable to connect to database. Try again later.' });
    return;
  }

  res.status(200).json({ message: 'Deleted card!' });
}

export default handler;

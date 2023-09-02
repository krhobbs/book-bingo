import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { connectDatabase } from '../../../utils/db-utils';
import { authOptions } from '../auth/[...nextauth]';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return;
  }

  const session = await getServerSession(req, res, authOptions);
  const card = req.body;

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

    const cardResult = await cardsCollection.insertOne(card);

    const newCardId = cardResult.insertedId.toString();
    client.close();
    res.status(200).json({ _id: newCardId });

  } catch (error) {
    res
      .status(422)
      .json({ message: 'Unable to connect to database. Try again later.' });
    return;
  }

}

export default handler;

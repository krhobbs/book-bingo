import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { getSession } from 'next-auth/react';
import { connectDatabase } from '../../../utils/db-utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return;
  }

  const { cardId, archived } = req.body;

  const session = await getSession({ req: req });

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

    await cardsCollection.updateOne(
      { _id: new ObjectId(cardId) },
      { $set: { archived: !archived } }
    );

    client.close();
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Unable to connect to database. Try again later.' });
    return;
  }

  res.status(200).json({ message: 'Archived old card!' });
}

export default handler;

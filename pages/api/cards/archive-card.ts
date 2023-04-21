import { ObjectId } from 'mongodb';
import { getSession } from 'next-auth/react';
import { connectDatabase } from '../../../utils/db-utils';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const { cardId } = req.body;
  console.log(`Archiving ${cardId}`)

  const session = await getSession({ req: req });

  // Make sure the user is authenticated
  if (!session) {
    res.status(401).json({ message: 'Not authenticated.' });
    return;
  }

  const username = session.user.username;

  const client = await connectDatabase();
  const usersCollection = client.db().collection('users');
  const cardsCollection = client.db().collection('cards');

  const user = await usersCollection.findOne({ username: username });

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
  }

  await cardsCollection.updateOne(
    {_id: new ObjectId(cardId) },
    { $set: { archived: true } }
  );

  const result = await usersCollection.updateOne(
    { username: username },
    {
      $pull: { cards: cardId },
      $push: { archivedCards: { $each: [cardId], $position: 0 } },
    }
  );

  client.close();
  res.status(200).json({ message: 'Archived old card!' });
}

export default handler;

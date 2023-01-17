import { getSession } from 'next-auth/react';
import { connectDatabase } from '../../../utils/db-utils';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const session = await getSession({ req: req });

  // Make sure the user is authenticated
  if (!session) {
    res.status(401).json({ message: 'Not authenticated.' });
    return;
  }

  const username = session.user.username;
  const friendToAdd = req.body.friendToAdd;

  const client = await connectDatabase();
  const usersCollection = client.db().collection('users');

  const user = await usersCollection.findOne({ username: username });

  const newFriend = await usersCollection.findOne({ username: friendToAdd });

  if (!newFriend) {
    res.status(404).json({ message: 'Unable to add friend. User not found.'});
    return;
  }

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    return;
  }

  const result = await usersCollection.updateOne(
    { username: username },
    { $push: { friends: friendToAdd } }
  );

  client.close();
  res.status(200).json({ message: 'Added new friend!' });
}

export default handler;

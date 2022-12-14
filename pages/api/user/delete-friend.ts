import { getSession } from 'next-auth/react';
import { connectDatabase } from '../../../utils/db-utils';

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req: req });

  // Make sure the user is authenticated
  if (!session) {
    res.status(401).json({ message: 'Not authenticated.' });
    return;
  }

  const username = session.user.username;
  const friendToDelete = req.body.friendToDelete;

  const client = await connectDatabase();
  const usersCollection = client.db().collection('users');

  const user = await usersCollection.findOne({ username: username });

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
  }

  const result = await usersCollection.updateOne(
    { username: username },
    { $pull: { friends: friendToDelete } }
  );

  client.close();
  res.status(200).json({ message: 'Password updated!' });
}

export default handler;

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { connectDatabase } from '../../../utils/db-utils';
import { authOptions } from '../auth/[...nextauth]';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  // Make sure the user is authenticated
  if (!session) {
    res.status(401).json({ message: 'Not authenticated.' });
    return;
  }

  const username = session.user.username;
  const friendToAdd = req.body.friendToAdd;

  try {
    const client = await connectDatabase();
    const usersCollection = client.db().collection('users');

    const user = await usersCollection.findOne({ username: username });

    const newFriend = await usersCollection.findOne({ username: friendToAdd });

    if (!newFriend) {
      res
        .status(404)
        .json({ message: 'Unable to add friend. User not found.' });
      return;
    }

    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    await usersCollection.updateOne(
      { username: username },
      { $push: { friends: friendToAdd } }
    );

    client.close();
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Unable to connect to database. Try again later.' });
    return;
  }

  res.status(200).json({ message: 'Added new friend!' });
}

export default handler;

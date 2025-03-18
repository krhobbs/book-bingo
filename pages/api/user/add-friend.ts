import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { isUsernameTaken, insertFriendOfUser } from '../../../utils/db-utils';
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
    const friendExists = await isUsernameTaken(friendToAdd);

    if (!friendExists || !username) {
      res
        .status(404)
        .json({ message: 'Unable to add friend. User not found.' });
      return;
    }

    await insertFriendOfUser(username, friendToAdd);
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Unable to connect to database. Try again later.' });
    return;
  }

  res.status(200).json({ message: 'Added new friend!' });
}

export default handler;

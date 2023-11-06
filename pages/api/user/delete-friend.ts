import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { deleteFriendOfUser } from '../../../utils/db-utils';
import { authOptions } from '../auth/[...nextauth]';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  // Make sure the user is authenticated
  if (!session) {
    res.status(401).json({ message: 'Not authenticated.' });
    return;
  }

  const userID = session.user.id;
  const friendToDelete = req.body.friendToDelete;

  try {
    await deleteFriendOfUser(userID, friendToDelete);
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Unable to connect to database. Try again later.' });
    return;
  }

  res.status(200).json({ message: 'Friend Deleted!' });
}

export default handler;

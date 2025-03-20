import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import {
  doesUserExistByID,
  insertFriendOfUser,
} from '../../../../utils/db-utils';
import { authOptions } from '../../auth/[...nextauth]';
import { paramToString } from '../../../../utils/param-utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const userID = paramToString(req.query.user_id);

  // Make sure the user is authenticated
  if (!session || !userID) {
    return res.status(401).json({ message: 'Not authenticated.' });
  }

  const friendID = req.body.friendToAdd;

  try {
    const friendExists = await doesUserExistByID(friendID);

    if (!friendExists) {
      return res
        .status(404)
        .json({ message: 'Unable to add friend. User not found.' });
    }

    await insertFriendOfUser(userID, friendID);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Unable to connect to database. Try again later.' });
  }

  return res.status(200).json({ message: 'Added new friend!' });
}

export default handler;

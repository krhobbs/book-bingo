import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import {
  deleteFriendOfUser,
  doesUserExistByID,
  insertFriendOfUser,
  setUsername,
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

  const friendID = req.body.friendID;

  if (req.method === 'POST') {
    try {
      const friendExists = await doesUserExistByID(friendID);

      if (!friendExists) {
        return res
          .status(404)
          .json({ message: 'Unable to add friend. User not found.' });
      }

      await insertFriendOfUser(userID, friendID);
      return res.status(200).json({ message: 'Added new friend!' });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Unable to connect to database. Try again later.' });
    }
  }

  if (req.method === 'PATCH') {
    try {
      await deleteFriendOfUser(userID, friendID);
      return res.status(200).json({ message: 'Deleted friend!' });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Unable to connect to database. Try again later. ' });
    }
  }

  if (req.method === 'PUT') {
    const username = paramToString(req.body.username);

    if (!username) {
      return res.status(400).json({ message: 'Invalid username.' });
    }

    try {
      await setUsername(username, userID);
      return res.status(200).json({ message: 'Set username.' });
    } catch (error) {
      return res
        .status(503)
        .json({ message: 'Unable to connect to database. Try again later.' });
    }
  }

  return res.status(400).json({ message: 'Invalid response.' });
}

export default handler;

import type { NextApiRequest, NextApiResponse } from 'next';
import {
  updatePasswordOfUser,
  getUserByUsername,
} from '../../../utils/db-utils';
import { verifyPassword, hashPassword } from '../../../utils/auth-utils';
import { getServerSession } from 'next-auth/next';
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

  const username = session.user.username;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  if (newPassword.trim().length < 7) {
    res.status(422).json({ message: 'Password must be >= 8 characters.' });
    return;
  }

  try {
    const user = await getUserByUsername(username);

    const currentPassword = user.password;
    const verified = await verifyPassword(oldPassword, currentPassword);

    if (!verified) {
      res.status(403).json({ message: 'Incorrect old password!' });
      return;
    }

    const hashedPassword = await hashPassword(newPassword);

    await updatePasswordOfUser(user.id, hashedPassword);
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Unable to connect to database. Try again later.' });
    return;
  }

  res.status(200).json({ message: 'Password updated!' });
}

export default handler;

import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { connectDatabase } from '../../../utils/db-utils';
import { verifyPassword, hashPassword } from '../../../utils/auth-utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req: req });

  // Make sure the user is authenticated
  if (!session) {
    res.status(401).json({ message: 'Not auth' });
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
    const client = await connectDatabase();
    const usersCollection = client.db().collection('users');

    const user = await usersCollection.findOne({ username: username });

    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    const currentPassword = user.password;
    const verified = await verifyPassword(oldPassword, currentPassword);

    if (!verified) {
      res.status(403).json({ message: 'Incorrect old password!' });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(newPassword);

    await usersCollection.updateOne(
      { username: username },
      { $set: { password: hashedPassword } }
    );

    client.close();
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Unable to connect to database. Try again later.' });
    return;
  }

  res.status(200).json({ message: 'Password updated!' });
}

export default handler;

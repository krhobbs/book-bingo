import { getSession } from 'next-auth/react';
import { connectDatabase } from '../../../utils/db-utils';
import { verifyPassword, hashPassword } from '../../../utils/auth-utils';

async function handler(req, res) {
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

  const client = await connectDatabase();
  const usersCollection = client.db().collection('users');

  const user = await usersCollection.findOne({ username: username });

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
  }

  const currentPassword = user.password;
  const verified = await verifyPassword(oldPassword, currentPassword);

  if (!verified) {
    res.status(403).json({ message: 'Incorrect password!' });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { username: username },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({ message: 'Password updated!' });
}

export default handler;

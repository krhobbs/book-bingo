import type { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '../../../utils/auth-utils';
import { connectDatabase, getDocumentByUsername } from '../../../utils/db-utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body;

    const { username, password } = data;

    if (
      !username ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({ message: 'Invalid input. Username must be at least one character and password must be at least 8.' });
      return;
    }

    const client = await connectDatabase();

    const db = client.db();

    const existingUser = await getDocumentByUsername(client, 'users', username);

    if (existingUser) {
        res.status(422).json({message: "That username is taken."});
        client.close();
        return;
    }

    const hashedPassword = await hashPassword(password);


    await db.collection('users').insertOne({
      username: username,
      password: hashedPassword,
      friends: []
    });

    res.status(201).json({ message: 'Created user.' });
    client.close();
  }
}

export default handler;

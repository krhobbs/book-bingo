import type { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '../../../utils/auth-utils';
import {
  isUsernameTaken,
  insertUser
} from '../../../utils/db-utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body;

    const { username, password } = data;

    if (!username || !password || password.trim().length < 7) {
      res
        .status(422)
        .json({
          message:
            'Invalid input. Username must be at least one character and password must be at least 8.',
        });
      return;
    }

    try {
      const usernameTaken = await isUsernameTaken(username);

      if (usernameTaken) {
        res.status(422).json({ message: 'That username is taken.' });
        return;
      }

      const hashedPassword = await hashPassword(password);

      await insertUser(username, hashedPassword);

      res.status(201).json({ message: 'Created user.' });
    } catch (error) {
      res
        .status(422)
        .json({ message: 'Unable to connect to database. Try again later.' });
      return;
    }

    res.status(201).json({ message: 'Registered New User!' });
  }
}

export default handler;

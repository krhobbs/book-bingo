import type { NextApiRequest, NextApiResponse } from 'next';
import {
  isUsernameTaken,
} from '../../../utils/db-utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body;

    const { username, email } = data;

    if (!username || !email) {
      res
        .status(422)
        .json({
          message:
            'Invalid input. Username must be at least one character and must have authenticated yourself with Google.',
        });
      return;
    }

    try {
      const usernameTaken = await isUsernameTaken(username);

      if (usernameTaken) {
        res.status(422).json({ message: 'That username is taken.' });
        return;
      }

      res.status(201).json({ message: 'Created user.' });
    } catch (error) {
      res
        .status(503)
        .json({ message: 'Unable to connect to database. Try again later.' });
      return;
    }

    res.status(201).json({ message: 'Registered New User!' });
  }
}

export default handler;

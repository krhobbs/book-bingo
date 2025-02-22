import type { NextApiRequest, NextApiResponse } from 'next';
import { setUsername } from '../../../utils/db-utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body;

    const { username, identifier, provider } = data;

    if (!username || !identifier || !provider) {
      res
        .status(422)
        .json({
          message: 'Invalid input. Username must be at least one character.',
        });
      return;
    }

    try {
      await setUsername(username, identifier, provider);
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

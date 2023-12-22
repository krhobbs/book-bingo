import type { NextApiRequest, NextApiResponse } from 'next';
import { getCardsOfUser } from '../../../../utils/db-utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;
  if (Array.isArray(username)) return;
  try {
    const cards = await getCardsOfUser(username, true);

    res.status(200).json(cards);
  } catch (e) {
    res
      .status(422)
      .json({ message: 'Unable to connect to database. Try again later.' });
    return;
  }
}

export default handler;

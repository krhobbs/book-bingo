import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../../utils/db-utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;
  if (Array.isArray(username)) return;
  try {
    const client = await connectDatabase();
    const cards = await client.db().collection<Card>('cards').find({archived: true, user: username}).toArray();

    res.status(200).json(cards);
  } catch (e) {
    res
      .status(422)
      .json({ message: 'Unable to connect to database. Try again later.' });
    return;
  }
}

export default handler;

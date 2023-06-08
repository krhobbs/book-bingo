import type { NextApiResponse } from 'next';
import { connectDatabase } from '../../../utils/db-utils';

async function handler(res: NextApiResponse) {
  try {
    const client = await connectDatabase();
    const cards = await client.db().collection('cards').find({archived: false}).toArray();
    
    res.status(200).json(cards);
  } catch (e) {
    res
      .status(422)
      .json({ message: 'Unable to connect to database. Try again later.' });
    return;
  }
}

export default handler;

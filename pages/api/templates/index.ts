import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../utils/db-utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await connectDatabase();
    const templates = await client.db().collection<Template>('templates').find().toArray();
    
    res.status(200).json(templates);
  } catch (e) {
    res
      .status(422)
      .json({ message: 'Unable to connect to database. Try again later.' });
    return;
  }
}

export default handler;

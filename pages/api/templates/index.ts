import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllTemplates } from '../../../utils/db-utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    const templates = await getAllTemplates();
    
    res.status(200).json(templates);
  } catch (e) {
    res
      .status(422)
      .json({ message: 'Unable to connect to database. Try again later.' });
    return;
  }
}

export default handler;

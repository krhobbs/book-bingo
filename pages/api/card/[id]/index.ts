import type { NextApiRequest, NextApiResponse } from 'next';
import { getCardById } from '../../../../utils/db-utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (Array.isArray(id)) return;
  try {

    const card = await getCardById(id);

    res.status(200).json(card);
  } catch (e) {
    res
      .status(422)
      .json({ message: 'Unable to connect to database. Try again later.' });
    return;
  }
}

export default handler;

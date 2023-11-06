import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase, getDocumentById, getTemplateById } from '../../../../utils/db-utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (Array.isArray(id)) return;
  try {
   const template = getTemplateById(id);

    res.status(200).json(template);
  } catch (e) {
    res
      .status(422)
      .json({ message: 'Unable to connect to database. Try again later.' });
    return;
  }
}

export default handler;

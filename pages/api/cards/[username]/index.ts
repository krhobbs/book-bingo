import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase, getDocumentsByUsername } from '../../../../utils/db-utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;
  if (Array.isArray(username)) return;
  try {
    const client = await connectDatabase();
    const card = await getDocumentsByUsername(client, 'cards', [ username ], { archived: false });

    res.status(200).json(card);
  } catch (e) {
    res
      .status(422)
      .json({ message: 'Unable to connect to database. Try again later.' });
    return;
  }
}

export default handler;

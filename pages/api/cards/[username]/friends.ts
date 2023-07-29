import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase, getDocumentsByUsername } from '../../../../utils/db-utils';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';

async function handler(req: NextApiRequest, res: NextApiResponse) {

    const session = await getServerSession(req, res, authOptions);

  // Make sure the user is authenticated
  if (!session) {
    res.status(401).json({ message: 'Not authenticated.' });
    return;
  }
  
  try {
    const client = await connectDatabase();
    const card = await getDocumentsByUsername(client, 'cards', session.user.friends, { archived: false });

    res.status(200).json(card);
  } catch (e) {
    res
      .status(422)
      .json({ message: 'Unable to connect to database. Try again later.' });
    return;
  }
}

export default handler;

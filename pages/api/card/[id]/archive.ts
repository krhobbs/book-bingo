import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { connectDatabase, toggleArchiveCard } from '../../../../utils/db-utils';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return;
  }
  
  const id: string = req.query.id as string;
  const { archived } = req.body;

  const session = await getServerSession(req, res, authOptions);

  // Make sure the user is authenticated
  if (!session) {
    res.status(401).json({ message: 'Not authenticated.' });
    return;
  }

  try {

    await toggleArchiveCard(id, archived);

  } catch (error) {
    res
      .status(422)
      .json({ message: 'Unable to connect to database. Try again later.' });
    return;
  }

  res.status(200).json({ message: 'Archived old card!' });
}

export default handler;

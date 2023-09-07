import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { connectDatabase } from '../../../../utils/db-utils';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return;
  }

  const id: string = req.query.id as string;

  const session = await getServerSession(req, res, authOptions);

  // Make sure the user is authenticated
  if (!session) {
    res.status(401).json({ message: 'Not authenticated.' });
    return;
  }

  const username = session.user.username;

  try {
    const client = await connectDatabase();
    const templatesCollection = client.db().collection('templates');

    const template = await templatesCollection.findOne({ _id: new ObjectId(id)});

    if (template.createdBy === username) {
        await templatesCollection.deleteOne({ _id: new ObjectId(id) });
        res.status(200).json({ message: 'Deleted template!' });
    } else {
        res.status(401).json({ message: 'Unauthorized!' });
    }

    client.close();
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Unable to connect to database. Try again later.' });
    return;
  }
}

export default handler;

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { connectDatabase } from '../../../utils/db-utils';
import { authOptions } from '../auth/[...nextauth]';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  // Make sure the user is authenticated
  if (!session) {
    res.status(401).json({ message: 'Not authenticated.' });
    return;
  }

  const username = session.user.username;
  const { name, reqs } = req.body;

  try {
    const client = await connectDatabase();
    const templatesCollection = client.db().collection('templates');

    await templatesCollection.insertOne({
      name: name,
      createdBy: username,
      reqs: reqs,
    });

    client.close();
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Unable to connect to database. Try again later.' });
    return;
  }

  res.status(200).json({ message: 'Added new template!' });
}

export default handler;

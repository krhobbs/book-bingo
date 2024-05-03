import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { insertTemplate, checkUserPermission } from '../../../utils/db-utils';
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

  const user_id = session.user.id;
  const { name, reqs } = req.body;

  const allowed = await checkUserPermission(user_id, 'create_template');

  // Confirm that the user is able to
  if (!allowed) {
    res.status(401).json({ message: 'Not authorized to create a template.' });
    return;
  } 

  try {

    await insertTemplate(name, user_id, reqs);

  } catch (error) {
    res
      .status(422)
      .json({ message: 'Unable to connect to database. Try again later.' });
    return;
  }

  res.status(200).json({ message: 'Added new template!' });
}

export default handler;

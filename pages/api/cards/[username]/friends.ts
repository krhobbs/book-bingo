import type { NextApiRequest, NextApiResponse } from 'next';
import { getCardsOfUsers } from '../../../../utils/db-utils';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';

async function handler(req: NextApiRequest, res: NextApiResponse) {

  const session = await getServerSession(req, res, authOptions);
  const page = parseInt(req.query.page as string) || 1;

  // Make sure the user is authenticated
  if (!session) {
    res.status(401).json({ message: 'Not authenticated.' });
    return;
  }
  
  try {
    const [cards] = await getCardsOfUsers(session.user.friends, page)

    res.status(200).json(cards);
  } catch (e) {
    res
      .status(422)
      .json({ message: 'Unable to connect to database. Try again later.' });
    return;
  }
}

export default handler;

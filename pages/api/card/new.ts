import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { connectDatabase, getDocumentById } from '../../../utils/db-utils';
import { authOptions } from '../auth/[...nextauth]';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return;
  }

  const session = await getServerSession(req, res, authOptions);
  const { templateId } = req.body;

  // Make sure the user is authenticated
  if (!session) {
    res.status(401).json({ message: 'Not authenticated.' });
    return;
  }

  const username = session.user.username;

  try {
    const client = await connectDatabase();
    const usersCollection = client.db().collection('users');
    const cardsCollection = client.db().collection('cards');

    const user = await usersCollection.findOne({ username: username });
    const { reqs } = await getDocumentById(client, 'templates', templateId);

    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    const cardResult = await cardsCollection.insertOne({
      user: username,
      archived: false,
      squares: [
        {
          id: '1A',
          req: reqs[0],
          book: null,
          color: null,
        },
        {
          id: '1B',
          req: reqs[1],
          book: null,
          color: null,
        },
        {
          id: '1C',
          req: reqs[2],
          book: null,
          color: null,
        },
        {
          id: '1D',
          req: reqs[3],
          book: null,
          color: null,
        },
        {
          id: '1E',
          req: reqs[4],
          book: null,
          color: null,
        },
        {
          id: '2A',
          req: reqs[5],
          book: null,
          color: null,
        },
        {
          id: '2B',
          req: reqs[6],
          book: null,
          color: null,
        },
        {
          id: '2C',
          req: reqs[7],
          book: null,
          color: null,
        },
        {
          id: '2D',
          req: reqs[8],
          book: null,
          color: null,
        },
        {
          id: '2E',
          req: reqs[9],
          book: null,
          color: null,
        },
        {
          id: '3A',
          req: reqs[10],
          book: null,
          color: null,
        },
        {
          id: '3B',
          req: reqs[11],
          book: null,
          color: null,
        },
        {
          id: '3C',
          req: reqs[12],
          book: null,
          color: null,
        },
        {
          id: '3D',
          req: reqs[13],
          book: null,
          color: null,
        },
        {
          id: '3E',
          req: reqs[14],
          book: null,
          color: null,
        },
        {
          id: '4A',
          req: reqs[15],
          book: null,
          color: null,
        },
        {
          id: '4B',
          req: reqs[16],
          book: null,
          color: null,
        },
        {
          id: '4C',
          req: reqs[17],
          book: null,
          color: null,
        },
        {
          id: '4D',
          req: reqs[18],
          book: null,
          color: null,
        },
        {
          id: '4E',
          req: reqs[19],
          book: null,
          color: null,
        },
        {
          id: '5A',
          req: reqs[20],
          book: null,
          color: null,
        },
        {
          id: '5B',
          req: reqs[21],
          book: null,
          color: null,
        },
        {
          id: '5C',
          req: reqs[22],
          book: null,
          color: null,
        },
        {
          id: '5D',
          req: reqs[23],
          book: null,
          color: null,
        },
        {
          id: '5E',
          req: reqs[24],
          book: null,
          color: null,
        },
      ],
    });

    const newCardId = cardResult.insertedId.toString();

    client.close();
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Unable to connect to database. Try again later.' });
    return;
  }

  res.status(200).json({ message: 'Added new card!' });
}

export default handler;

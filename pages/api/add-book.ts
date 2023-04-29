import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { connectDatabase } from '../../utils/db-utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body;

    const { card, title, author, square, color } = data;

    try {
      const client = await connectDatabase();

      const db = client.db();

      const booksCollection = db.collection('cards');

      await booksCollection.updateOne(
        {
          _id: new ObjectId(card),
          'squares.id': square,
        },
        {
          $set: {
            'squares.$.color': color,
            'squares.$.book': {
              title: title,
              author: author,
            },
          },
        }
      );

      client.close();
    } catch (error) {
      res
        .status(422)
        .json({ message: 'Unable to connect to database. Try again later.' });
      return;
    }

    res.status(201).json({ message: 'Book Added!' });
  }
}

export default handler;
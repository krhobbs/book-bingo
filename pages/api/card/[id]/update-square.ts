import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { connectDatabase } from '../../../../utils/db-utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const id: string = req.query.id as string;
    const { id: square, book, color } = req.body;

    try {
      const client = await connectDatabase();

      const db = client.db();

      const cardsCollection = db.collection('cards');

      await cardsCollection.updateOne(
        {
          _id: new ObjectId(id),
          'squares.id': square,
        },
        {
          $set: {
            'squares.$.color': color,
            'squares.$.book': book,
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

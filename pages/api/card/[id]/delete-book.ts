import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../../utils/db-utils';
import { ObjectId } from 'mongodb';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const id: string = req.query.id as string;
    const { squareId } = req.body;

    try {
      const client = await connectDatabase();
      const db = client.db();
      const cardsCollection = db.collection('cards');

      await cardsCollection.updateOne(
        {
          _id: new ObjectId(id),
          'squares.id': squareId,
        },
        {
          $set: {
            'squares.$.book': null,
          },
        }
      );

      client.close();

      res.status(201).json({ message: 'Book Removed!' });
    } catch (error) {
        res
        .status(422)
        .json({ message: 'Unable to connect to database. Try again later.' });
      return;
    }
  }
}

export default handler;

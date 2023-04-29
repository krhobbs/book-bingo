import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../utils/db-utils';
import { ObjectId } from 'mongodb';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { cardId, squareId } = req.body;

    try {
      const client = await connectDatabase();
      const db = client.db();
      const cardsCollection = db.collection('cards');

      await cardsCollection.updateOne(
        {
          _id: new ObjectId(cardId),
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

    res.status(201).json({ message: 'Book Deleted!' });
  }
}

export default handler;

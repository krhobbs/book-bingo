import { connectDatabase } from '../../utils/db-utils';
import { ObjectId } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const { cardId, squareId } = req.body;

        const client = await connectDatabase();
        const db = client.db();
        const cardsCollection = db.collection('cards');

        await cardsCollection.updateOne(
            {
                _id: new ObjectId(cardId),
                'squares.id': squareId
            },
            {
                $set: {
                    'squares.$.book': null
                }
            }
        );

        client.close();

        res.status(201).json({message: 'Book Removed!'});
    }
}

export default handler;
import { connectDatabase } from '../../utils/db-utils';

async function handler(req, res) {
    if (req.method === 'POST') {
        const { user, square } = req.body;

        const client = await connectDatabase();
        const db = client.db();
        const cardsCollection = db.collection('cards');

        const removeBook = await cardsCollection.updateOne(
            {
                user: user,
                'squares.id': square
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
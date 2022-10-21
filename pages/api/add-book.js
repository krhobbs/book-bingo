import { connectDatabase } from '../../utils/db-utils';

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const { title, author, user, square } = data;

        const client = await connectDatabase();
        const db = client.db();

        const booksCollection = db.collection('cards');

        const addBook = await booksCollection.updateOne(
            {
                user: user,
                'squares.id': square
            },
                {
                    $set: {
                        'squares.$.book': {
                            title: title,
                            author: author
                        }
                    }
                }
        );

        client.close();

        res.status(201).json({message: 'Book Added!'});
    }
}

export default handler;
import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const { title, author, user, square } = data;

        const client = await MongoClient.connect('mongodb+srv://kylehobbs:dumbledore7@cluster0.9evla.mongodb.net/books?retryWrites=true&w=majority');
        const db = client.db();

        const booksCollection = db.collection('cards');

        console.log(title, author, user, square);

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
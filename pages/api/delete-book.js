import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://***REMOVED***:***REMOVED***@***REMOVED***?retryWrites=true&w=majority');
        const db = client.db();

        const booksCollection = db.collection('books');

        const removeBook = await booksCollection.deleteMany(data);

        client.close();

        res.status(201).json({message: 'Book Removed!'});
    }
}

export default handler;
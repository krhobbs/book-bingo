import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const { title, author, image } = data;

        const client = await MongoClient.connect('mongodb+srv://kylehobbs:dumbledore7@cluster0.9evla.mongodb.net/books?retryWrites=true&w=majority');
        const db = client.db();

        const booksCollection = db.collection('books');

        const result = await booksCollection.insertOne(data);

        client.close();

        res.status(201).json({message: 'Book Added!'});
    }
}

export default handler;
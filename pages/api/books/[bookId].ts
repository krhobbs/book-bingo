import { connectDatabase, getDocumentById } from '../../../utils/db-utils';

async function handler(req, res) {
    const bookId = req.query.bookId;

    let client;

    try {
        client = await connectDatabase();
    } catch (error) {
        res.status(500).json({ message: 'Connecting to the database failed!' });
        return;
    }

    if (req.method === 'GET') {
        try {
            const document = await getDocumentById(client, 'books', bookId);
            res.status(200).json({ books: document });
        } catch (error) {
            res.status(500).json({ message: 'Getting comments failed.' });
        }

        client.close();

    }
}

export default handler;
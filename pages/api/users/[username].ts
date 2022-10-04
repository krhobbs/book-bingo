import { connectDatabase, getDocumentByUsername } from '../../../utils/db-utils';

async function handler(req, res) {
    const username = req.query.username;

    let client;

    try {
        client = await connectDatabase();
    } catch (error) {
        res.status(500).json({ message: 'Connecting to the database failed!' });
        return;
    }

    if (req.method === 'GET') {
        try {
            const document = await getDocumentByUsername(client, 'users', username);
            res.status(200).json({ user: document });
        } catch (error) {
            res.status(500).json({ message: 'Getting comments failed.' });
        }

        client.close();

    }
}

export default handler;
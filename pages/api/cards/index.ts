import { connectDatabase, getDocuments } from '../../../utils/db-utils';

async function handler(req, res) {

    let client;

    try {
        client = await connectDatabase();
    } catch (error) {
        res.status(500).json({ message: 'Connecting to the database failed!' });
        return;
    }

    if (req.method === 'GET') {
        try {
            const document = await getDocuments(client, 'cards');
            res.status(200).json({ cards: document });
        } catch (error) {
            res.status(500).json({ message: 'Getting cards failed.' });
        }

        client.close();

    }
}

export default handler;
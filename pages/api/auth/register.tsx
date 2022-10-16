import { connectDatabase, getDocumentByUsername } from '../../../utils/db-utils';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const { username, password } = data;

    if (
      !username ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({ message: 'Invalid input. Username must be at least one character and password must be at least 8.' });
      return;
    }

    const client = await connectDatabase();

    const db = client.db();

    const existingUser = await getDocumentByUsername(client, 'users', username);

    if (existingUser) {
        res.status(422).json({message: "The username is taken."});
        client.close();
        return;
    }


    const result = await db.collection('users').insertOne({
      username: username,
      password: password,
      friends: []
    });

    res.status(201).json({ message: 'Created user.' });
    client.close();
  }
}

export default handler;

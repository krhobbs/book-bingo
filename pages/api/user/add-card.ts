import { getSession } from 'next-auth/react';
import { connectDatabase } from '../../../utils/db-utils';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const session = await getSession({ req: req });

  // Make sure the user is authenticated
  if (!session) {
    res.status(401).json({ message: 'Not authenticated.' });
    return;
  }

  const username = session.user.username;

  const client = await connectDatabase();
  const usersCollection = client.db().collection('users');
  const cardsCollection = client.db().collection('cards');

  const user = await usersCollection.findOne({ username: username });

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
  }

  const cardResult = await cardsCollection.insertOne({
    user: username,
    squares: [
        {
          id: "1A",
          req: "LGBTQIA List Book",
          book: null
        },
        {
          id: "1B",
          req: "Weird Ecology",
          book: null
        },
        {
          id: "1C",
          req: "Two or More Authors",
          book: null
        },
        {
          id: "1D",
          req: "Historical SFF",
          book: null
        },
        {
          id: "1E",
          req: "Set in Space",
          book: null
        },
        {
          id: "2A",
          req: "Stand alone",
          book: null
        },
        {
          id: "2B",
          req: "Anti-hero",
          book: null
        },
        {
          id: "2C",
          req: "Book Club or Readalong Book",
          book: null
        },
        {
          id: "2D",
          req: "Cool Weapon",
          book: null
        },
        {
          id: "2E",
          req: "Revolutions and Rebellions",
          book: null
        },
        {
          id: "3A",
          req: "Name in the Title",
          book: null
        },
        {
          id: "3B",
          req: "Author uses Initials",
          book: null
        },
        {
          id: "3C",
          req: "Published in 2022",
          book: null
        },
        {
          id: "3D",
          req: "Urban Fantasy",
          book: null
        },
        {
          id: "3E",
          req: "Set in Africa",
          book: null
        },
        {
          id: "4A",
          req: "Non-Human Protaganist",
          book: null
        },
        {
          id: "4B",
          req: "Wibbly Wobbly Timey Wimey",
          book: null
        },
        {
          id: "4C",
          req: "Five Short Stories",
          book: null
        },
        {
          id: "4D",
          req: "Mental Health",
          book: null
        },
        {
          id: "4E",
          req: "Self Published",
          book: null
        },
        {
          id: "5A",
          req: "Awards Finalist",
          book: null
        },
        {
          id: "5B",
          req: "BIPOC Author",
          book: null
        },
        {
          id: "5C",
          req: "Shape-shifters",
          book: null
        },
        {
          id: "5D",
          req: "No Ifs, Ands, or Buts",
          book: null
        },
        {
          id: "5E",
          req: "Family Matters",
          book: null
        }
      ]
  });

  const newCardId = cardResult.insertedId.toString();

  const result = await usersCollection.updateOne({ username: username }, { $set: { card: newCardId } });

  client.close();
  res.status(200).json({ message: 'Added new card!' });
}

export default handler;

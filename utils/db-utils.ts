import { MongoClient, ObjectId } from 'mongodb';

export async function connectDatabase() {
  try {
    const client = await MongoClient.connect(process.env.DB_HOST);
    return client;
  } catch (error) {
    throw new Error(
      'Unable to connect to the database. Please try again later.'
    );
  }
}

// Used to get cards on archived, index, profile pages
export async function getDocuments(client: MongoClient, collection: string, filter = {}) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort({ user: 1 })
    .toArray();

  let serializable;

  if (documents) {
    serializable = documents.map((document) => ({
      ...document,
      _id: document._id.toString(),
    }));
  } else {
    serializable = documents;
  }

  return serializable;
}

export async function getSquare(
  client: MongoClient,
  cardId: string,
  squareId: string
): Promise<Square> {
  const db = client.db();

  const card = await db
    .collection('cards')
    .findOne({ _id: new ObjectId(cardId) });

  if (!card) {
    throw new Error('Card not found.');
  }

  const square = card.squares.find((s: Square) => s.id === squareId);

  return square;
}

// Not currently used anywhere
export async function getDocumentById(
  client: MongoClient,
  collection: string,
  id: string
) {
  const db = client.db();

  const document = await db
    .collection(collection)
    .findOne({ _id: new ObjectId(id) });

  return document;
}

// Used in the register function to make sure the username is not already taken
export async function getDocumentByUsername(client, collection, username) {
  const db = client.db();

  const document = await db
    .collection(collection)
    .findOne({ username: username });

  let serializable;

  if (document) {
    serializable = { ...document, _id: document._id.toString() };
  } else {
    serializable = document;
  }

  return serializable;
}

// Used on the friends page to get all cards of friends
export async function getDocumentsByUsername(
  client,
  collection,
  usernames,
  filters = {}
) {
  const db = client.db();

  if (usernames.length <= 0) {
    return [];
  }

  const filter = {
    $or: usernames.map((username) => {
      return { user: username };
    }),
    ...filters,
  };

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort({ user: 1 })
    .toArray();

  let serializable;

  if (documents) {
    serializable = documents.map((document) => ({
      ...document,
      _id: document._id.toString(),
    }));
  } else {
    serializable = documents;
  }

  return serializable;
}

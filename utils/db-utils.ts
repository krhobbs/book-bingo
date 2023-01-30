import { MongoClient, ObjectId } from 'mongodb';

export async function connectDatabase() {
  try {
    const client = await MongoClient.connect(process.env.DB_HOST);
    return client;
  } catch (error) {
    throw new Error('Unable to connect to the database. Please try again later.');
  }
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getDocuments(client, collection, filter = {}) {
  const db = client.db();

  const documents = await db.collection(collection).find(filter).toArray();

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

export async function getDocumentById(client, collection, id) {
  const db = client.db();

  const document = await db
    .collection(collection)
    .findOne({ _id: new ObjectId(id) });

  let serializable;

  if (document) {
    serializable = { ...document, _id: document._id.toString() };
  } else {
    serializable = document;
  }

  return serializable;
}

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

export async function getDocumentsByUsername(client, collection, usernames) {
  const db = client.db();

  if (usernames.length <= 0) {
    return [];
  }

  const filter = { '$or': usernames.map((username) => {
    return { user: username }
  }) }

  const documents = await db
    .collection(collection)
    .find(filter)
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

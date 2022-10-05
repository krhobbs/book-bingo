import { MongoClient, ObjectId } from 'mongodb';

export async function connectDatabase() {
  const client = await MongoClient.connect(process.env.DB_HOST);

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getDocuments(client, collection, filter = {}) {
  const db = client.db();

  const documents = await db.collection(collection).find(filter).toArray();

  const serializable = documents.map((document) => ({
    ...document,
    _id: document._id.toString(),
  }));

  return serializable;
}

export async function getDocumentById(client, collection, id) {
  const db = client.db();

  const document = await db
    .collection(collection)
    .findOne({ _id: new ObjectId(id) });

  const serializable = { ...document, _id: document._id.toString() };

  return serializable;
}

export async function getDocumentByUsername(client, collection, username) {
  const db = client.db();

  const document = await db
    .collection(collection)
    .findOne({ username: username });

  const serializable = { ...document, _id: document._id.toString() };

  return serializable;
}

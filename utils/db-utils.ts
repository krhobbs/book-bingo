import { MongoClient, ObjectId } from 'mongodb';

export async function connectDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://***REMOVED***:***REMOVED***@***REMOVED***?retryWrites=true&w=majority'
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getDocuments(client, collection, filter = {}) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find(filter)
    .toArray();

  return documents;
}

export async function getDocumentById(client, collection, id) {
    const db = client.db();

    const document = await db.collection(collection).findOne({_id: new ObjectId(id)});

    return document;
}

export async function getDocumentByUsername(client, collection, username) {
    const db = client.db();

    const document = await db.collection(collection).findOne({username: username});

    return document;
}
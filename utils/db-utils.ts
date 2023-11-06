import { MongoClient, ObjectId } from 'mongodb';
import sql from './db';

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

// gets user related data
// for the next auth api, returning from the useSession hooks
export async function getUserByUsername(username: string) {
  const user = await sql<{id: string; username: string; password: string; friends: string[]}[]>`
    SELECT user_.id AS "id", user_.username, user_.password, CASE 
    WHEN count(friend_.username) = 0
      THEN '[]'::jsonb
      ELSE jsonb_agg(friend_.username)
    END AS "friends"
    FROM ((bingo.users user_ LEFT JOIN bingo.friends ON user_.id = friends.user_id)
        LEFT JOIN bingo.users friend_ ON friend_.id = friends.friend_id)
    WHERE user_.username = ${username}
    GROUP BY user_.id, user_.username, user_.password;`

  return user[0];
}

// inserts user record into the users table
export async function insertUser(username: string, password: string) {
  await sql`
    INSERT INTO bingo.users(id, username, password, created_at) VALUES
    (gen_random_uuid(), ${username}, ${password}, NOW())
  `
}

// returns true if a user by that username exists in the database
export async function isUsernameTaken(username: string) {
  const countResult = await sql`
    SELECT COUNT(*) FROM bingo.users WHERE username = ${username}`;

  return countResult[0].count !== "0";
}

// adds a new card by insterting a record into the cards table and 25 records into the card_squares table
export async function insertCard(user_id: string, template_id: string) : Promise<string> {
  const insertCard = await sql`
    INSERT INTO bingo.cards(id, user_id, template_id, archived, created_at) VALUES
    (gen_random_uuid(), ${user_id}, ${template_id}, false, NOW())
    returning id`

  const { id: card_id } = insertCard[0];
  const values: {
    id: number,
    card_id: string
  }[] = [];
  for (let i = 0; i < 25; i++) {
    values.push({id: i, card_id: card_id});
  }

  await sql`
    INSERT INTO bingo.card_squares ${sql(values)}
  `
  
  return card_id;
}

// updates a card record, by toggling the archived column to either archive or unarchive a card
export async function toggleArchiveCard(card_id: string, archived: boolean) {
  await sql`
    UPDATE bingo.cards SET archived = ${!archived} WHERE id = ${card_id}`
}

// deletes a cards record, deletes the corresponding card_squares record
export async function deleteCard(card_id: string) {
  await sql`
    DELETE FROM bingo.card_squares WHERE card_id = ${card_id}`

  await sql`
    DELETE FROM bingo.cards WHERE id = ${card_id}`
}

// takes a card_id and returns data conforming to the Card type
export async function getCardById(card_id: string) {
  const cardResult = await sql`
    SELECT users.username AS "user", bool_and(cards.archived) AS "archived", templates.name AS "template", jsonb_agg(json_build_object('id', card_squares.id, 'req', template_reqs.req, 'book', card_squares.book, 'color', card_squares.color)) AS squares
    FROM ((((bingo.cards INNER JOIN bingo.users ON cards.user_id = users.id)
        INNER JOIN bingo.templates ON cards.template_id = templates.id) 
        INNER JOIN bingo.card_squares ON cards.id = card_squares.card_id)
        INNER JOIN bingo.template_reqs ON cards.template_id = template_reqs.template_id AND card_squares.id = template_reqs.id)
    WHERE cards.id = ${card_id}
    GROUP BY users.username, templates.name, cards.created_at
    ORDER BY cards.created_at DESC`
  
  return cardResult[0];
}

// updates the corresponding square from card_squares table with new value for book, color, and completed_at
export async function updateCardSquare(card_id: string, square: Square) {
  const bookJSON = square.book ? JSON.stringify(square.book) : null;
  const color = square.color ? square.color : null;
  const completed = square.book ? true : false;

  await sql`
    UPDATE bingo.card_squares SET (book, color, completed_at) = (${bookJSON ? sql`${bookJSON}::text::jsonb` : sql`NULL`}, ${color}, ${ completed ? sql`NOW()` : sql`NULL`})
    WHERE id = ${parseInt(square.id)} AND card_id = ${card_id}
  `
}

// gets all cards from the database that are not archived
// used for the home page
export async function getAllCards() {
  const cards = await sql<Card[]>`
    SELECT cards.id as "_id", users.username as "user", bool_and(cards.archived) AS "archived", templates.name AS "template", jsonb_agg(json_build_object('id', card_squares.id, 'req', template_reqs.req, 'book', card_squares.book, 'color', card_squares.color) ORDER BY card_squares.id) AS squares
    FROM ((((bingo.cards INNER JOIN bingo.users ON cards.user_id = users.id)
        INNER JOIN bingo.templates ON cards.template_id = templates.id) 
        INNER JOIN bingo.card_squares ON cards.id = card_squares.card_id)
        INNER JOIN bingo.template_reqs ON cards.template_id = template_reqs.template_id AND card_squares.id = template_reqs.id)
    WHERE NOT cards.archived
    GROUP BY cards.id, users.username, templates.name
    ORDER BY users.username ASC`
  
  return cards;
}

// gets all the cards of a particular user, either archived or not archived (default)
// used for the profile page and archived page
export async function getCardsOfUser(user: string, archived = false) {
  const cards = await sql<Card[]>`
    SELECT cards.id AS "_id", users.username AS "user", bool_and(cards.archived) AS "archived", templates.name AS "template", jsonb_agg(json_build_object('id', card_squares.id, 'req', template_reqs.req, 'book', card_squares.book, 'color', card_squares.color) ORDER BY card_squares.id) AS squares
    FROM ((((bingo.cards INNER JOIN bingo.users ON cards.user_id = users.id)
        INNER JOIN bingo.templates ON cards.template_id = templates.id) 
        INNER JOIN bingo.card_squares ON cards.id = card_squares.card_id)
        INNER JOIN bingo.template_reqs ON cards.template_id = template_reqs.template_id AND card_squares.id = template_reqs.id)
    WHERE cards.archived = ${archived} AND users.username = ${user}
    GROUP BY users.username, templates.name, cards.created_at, cards.id
    ORDER BY cards.created_at DESC`
  
  return cards;
}

// gets all the cards of a set of users that are not archived
// used for the friends page
export async function getCardsOfUsers(users: string[]) {
  const cards = await sql<Card[]>`
    SELECT cards.id AS "_id", users.username AS "user", bool_and(cards.archived) AS "archived", templates.name AS "template", jsonb_agg(json_build_object('id', card_squares.id, 'req', template_reqs.req, 'book', card_squares.book, 'color', card_squares.color) ORDER BY card_squares.id) AS squares
    FROM ((((bingo.cards INNER JOIN bingo.users ON cards.user_id = users.id)
        INNER JOIN bingo.templates ON cards.template_id = templates.id) 
        INNER JOIN bingo.card_squares ON cards.id = card_squares.card_id)
        INNER JOIN bingo.template_reqs ON cards.template_id = template_reqs.template_id AND card_squares.id = template_reqs.id)
    WHERE NOT cards.archived AND users.username IN ${sql([...users])}
    GROUP BY users.username, templates.name, cards.created_at, cards.id
    ORDER BY cards.created_at DESC`

  return cards;
}

// inserts a template record into the templates table and 25 req records into the template_reqs table
export async function insertTemplate(name: string, user_id: string, reqs: string[]) {
  const insertTemplate = await sql`
    INSERT INTO bingo.templates(id, user_id, name, created_at) VALUES
    (gen_random_uuid(), ${user_id}, ${name}, NOW())
    returning id`

  const { id: template_id } = insertTemplate[0];
  const values: {
    id: number,
    template_id: string,
    req: string
  }[] = [];
  for (let i = 0; i < 25; i++) {
    values.push({id: i, template_id: template_id, req: reqs[i]});
  }

  await sql`
    INSERT INTO bingo.template_reqs ${sql(values)}
  `

  return template_id;
}

// deletes a template record and its corresponding template_reqs records
export async function deleteTemplate(template_id: string) {
  await sql`
    DELETE FROM bingo.template_reqs WHERE template_id = ${template_id}`

  await sql`
    DELETE FROM bingo.templates WHERE id = ${template_id}`
}

// gets template by id
export async function getTemplateById(template_id: string) {
  const templateResult = await sql`
    SELECT templates.id AS "_id", users.username AS "user", templates.name, jsonb_agg(template_reqs.req) AS reqs
    FROM ((bingo.templates INNER JOIN bingo.users ON templates.user_id = users.id)
      INNER JOIN bingo.template_reqs ON templates.id = template_reqs.template_id)
    WHERE templates.id = ${template_id}
    GROUP BY users.username, templates.name, templates.id`

  return templateResult[0];
}

// gets all templates
export async function getAllTemplates() {
  const templates = await sql`
    SELECT templates.id AS "_id", users.username AS "user", templates.name, jsonb_agg(template_reqs.req) AS reqs
    FROM ((bingo.templates INNER JOIN bingo.users ON templates.user_id = users.id)
      INNER JOIN bingo.template_reqs ON templates.id = template_reqs.template_id)
    GROUP BY users.username, templates.name, templates.id`

  return templates;
}

// inserts a new record into the friends table
export async function insertFriendOfUser(user: string, friend: string) {
  await sql`
    INSERT INTO bingo.friends (user_id, friend_id, created_at)
    SELECT user_.id, friend_.id, NOW()
    FROM bingo.users AS user_, bingo.users AS friend_
    WHERE user_.username = ${user} AND friend_.username = ${friend}`
}

// updates the password column of a user record
export async function updatePasswordOfUser(user_id: string, newPassword: string) {
  await sql`
    UPDATE bingo.users SET password = ${newPassword} WHERE user_id = ${user_id}`
}

// removes a record from the friends table
export async function deleteFriendOfUser(user_id: string, friend: string) {
  await sql`
    DELETE FROM bingo.friends 
    WHERE user_id = ${user_id} AND friend_id = (SELECT users.id FROM bingo.users WHERE username = ${friend})`
}

// get a single square from a card, fits into the client side Square type
export async function getSquareOfCard(card_id: string, square_id: number) {
  const squareResult = await sql`
    SELECT card_squares.id::text, template_reqs.req, card_squares.book, card_squares.color
    FROM (((bingo.cards INNER JOIN bingo.card_squares ON cards.id = card_squares.card_id)
        INNER JOIN bingo.templates ON cards.template_id = templates.id)
        INNER JOIN bingo.template_reqs ON templates.id = template_reqs.template_id AND card_squares.id = template_reqs.id)
    WHERE cards.id = ${card_id} AND card_squares.id = ${square_id}`

    return squareResult[0];
}

// NOT USED; WAIT TO DELETE
// returns list of the users friends
export async function getFriendsOfUser(user: string) {
  const friends = await sql`
    SELECT friend_.username AS "friends"
    FROM ((bingo.users user_ INNER JOIN bingo.friends ON user_.id = friends.user_id)
      INNER JOIN bingo.users friend_ ON friend_.id = friends.friend_id)
    WHERE user_.username = ${user}`.values();

  return friends.flat();
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

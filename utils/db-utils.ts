import sql from './db';

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

export async function checkUserPermission(user_id: string, permission: string) {
  const permResult = await sql`
    SELECT permission
    FROM bingo.user_permissions
    WHERE user_id = ${user_id}
  `.values();

  const perms = permResult.flat();

  return perms.includes(permission);
}

export async function insertUserByReddit(redditUsername: string) {
  await sql`
    INSERT INTO bingo.users(id, username, created_at) VALUES
    (gen_random_uuid(), ${redditUsername}, NOW())
  `
}

// returns true if a user by that username exists in the database
export async function isUsernameTaken(username: string) {
  const countResult = await sql`
    SELECT COUNT(*) FROM bingo.users WHERE username = ${username}`;

  return countResult[0].count !== "0";
}

// returns true if email is already in the users table
export async function doesRedditUserExist(redditUsername: string) {
  const countResult = await sql`
    SELECT COUNT(*) FROM bingo.users WHERE reddit_username = ${redditUsername}`;

  return countResult[0].count !== "0";
}

// returns true if a card is owned by a user
export async function isUsersCard(user_id: string, card_id: string) {
  const usersCardsResult = await sql`
    SELECT cards.id
    FROM bingo.cards INNER JOIN bingo.users ON cards.user_id = users.id
    WHERE users.id = ${user_id}
    GROUP BY users.username, cards.id`.values();

  const usersCards = usersCardsResult.flat();
  
  return usersCards.includes(card_id);
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
export async function getAllCards(pageNumber = 1): Promise<[Card[], number]> {
  const offsetValue = (pageNumber - 1) * 10;
  const cards = await sql<Card[]>`
    SELECT cards.id as "_id", users.username as "user", templates.name AS "template", bool_and(cards.archived) AS "archived", jsonb_agg(json_build_object('id', card_squares.id, 'req', template_reqs.req, 'book', card_squares.book, 'color', card_squares.color) ORDER BY card_squares.id) AS squares
    FROM ((((bingo.cards INNER JOIN bingo.users ON cards.user_id = users.id)
        INNER JOIN bingo.templates ON cards.template_id = templates.id) 
        INNER JOIN bingo.card_squares ON cards.id = card_squares.card_id)
        INNER JOIN bingo.template_reqs ON cards.template_id = template_reqs.template_id AND card_squares.id = template_reqs.id)
    WHERE NOT cards.archived
    GROUP BY cards.id, users.username, templates.name
    ORDER BY cards.created_at ASC
    LIMIT 10
    OFFSET ${offsetValue}`

  const cardCount = await sql`
    SELECT count(*) FROM bingo.cards WHERE NOT archived`

  const pageCount = Math.ceil(cardCount[0].count / 10);
  
  return [cards, pageCount];
}

// gets all the cards of a particular user, either archived or not archived (default)
// used for the profile page and archived page
export async function getCardsOfUser(user: string, archived = false, pageNumber = 1) : Promise<[Card[], number]> {
  const offsetValue = (pageNumber - 1) * 10;
  const cards = await sql<Card[]>`
    SELECT cards.id AS "_id", users.username AS "user", bool_and(cards.archived) AS "archived", templates.name AS "template", jsonb_agg(json_build_object('id', card_squares.id, 'req', template_reqs.req, 'book', card_squares.book, 'color', card_squares.color) ORDER BY card_squares.id) AS squares
    FROM ((((bingo.cards INNER JOIN bingo.users ON cards.user_id = users.id)
        INNER JOIN bingo.templates ON cards.template_id = templates.id) 
        INNER JOIN bingo.card_squares ON cards.id = card_squares.card_id)
        INNER JOIN bingo.template_reqs ON cards.template_id = template_reqs.template_id AND card_squares.id = template_reqs.id)
    WHERE cards.archived = ${archived} AND users.username = ${user}
    GROUP BY users.username, templates.name, cards.created_at, cards.id
    ORDER BY cards.created_at DESC
    LIMIT 10
    OFFSET ${offsetValue}`

  const cardCount = await sql`
    SELECT count(*) 
    FROM bingo.cards INNER JOIN bingo.users ON cards.user_id = users.id
    WHERE users.username = ${user} AND cards.archived = ${archived}`

  const pageCount = Math.ceil(cardCount[0].count / 10);
  
  return [cards, pageCount];
}

// gets all the cards of a set of users that are not archived
// used for the friends page
export async function getCardsOfUsers(users: string[], pageNumber = 1) {
  const offsetValue = (pageNumber - 1) * 10;
  const cards = await sql<Card[]>`
    SELECT cards.id AS "_id", users.username AS "user", bool_and(cards.archived) AS "archived", templates.name AS "template", jsonb_agg(json_build_object('id', card_squares.id, 'req', template_reqs.req, 'book', card_squares.book, 'color', card_squares.color) ORDER BY card_squares.id) AS squares
    FROM ((((bingo.cards INNER JOIN bingo.users ON cards.user_id = users.id)
        INNER JOIN bingo.templates ON cards.template_id = templates.id) 
        INNER JOIN bingo.card_squares ON cards.id = card_squares.card_id)
        INNER JOIN bingo.template_reqs ON cards.template_id = template_reqs.template_id AND card_squares.id = template_reqs.id)
    WHERE NOT cards.archived AND users.username IN ${sql([...users])}
    GROUP BY users.username, templates.name, cards.created_at, cards.id
    ORDER BY cards.created_at DESC
    LIMIT 10
    OFFSET ${offsetValue}`

  const cardCount = await sql`
    SELECT count(*) 
    FROM bingo.cards INNER JOIN bingo.users ON cards.user_id = users.id
    WHERE users.username IN ${sql([...users])} AND NOT cards.archived`

  const pageCount = Math.ceil(cardCount[0].count / 10);

  return [cards, pageCount];
}

export async function getUserCardCount(user_id: string) {
  const cardCount = await sql`
    SELECT count(*)
    FROM bingo.cards
    WHERE cards.user_id = ${user_id}`

  return cardCount[0].count;
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
export async function getAllTemplates(pageNumber = 1) {
  const offsetValue = (pageNumber - 1) * 10;
  const templates = await sql`
    SELECT templates.id AS "_id", users.username AS "user", templates.name, jsonb_agg(template_reqs.req) AS reqs
    FROM ((bingo.templates INNER JOIN bingo.users ON templates.user_id = users.id)
      INNER JOIN bingo.template_reqs ON templates.id = template_reqs.template_id)
    GROUP BY users.username, templates.name, templates.id
    ORDER BY templates.created_at DESC
    LIMIT 10
    OFFSET ${offsetValue}`

  const templateCount = await sql`
    SELECT count(*) FROM bingo.templates`

  const pageCount = Math.ceil(templateCount[0].count / 10);
  
  return [templates, pageCount];
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

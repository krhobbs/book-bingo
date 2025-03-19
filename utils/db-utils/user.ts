import sql from '../db';

/**
 * @param identifier id from account provider
 * @param provider account provider
 * @returns user data
 */
export async function getUser(
  identifier: string,
  provider: 'google' | 'reddit',
) {
  const user = await sql<{ id: string; username: string; friends: string[] }[]>`
    SELECT user_.id AS "id", user_.username, CASE 
    WHEN count(friend_.username) = 0
      THEN '[]'::jsonb
      ELSE jsonb_agg(friend_.id)
    END AS "friends"
    FROM ((bingo.users user_ LEFT JOIN bingo.friends ON user_.id = friends.user_id)
        LEFT JOIN bingo.users friend_ ON friend_.id = friends.friend_id)
    WHERE user_.account_identifier = ${identifier} AND user_.account_provider = ${provider}
    GROUP BY user_.id, user_.username;`;

  return user[0];
}

/**
 * @param identifier id from account provider
 * @param provider account provider
 * @param username
 */
export async function insertUser(
  identifier: string,
  provider: 'google' | 'reddit',
  username?: string,
) {
  await sql`
    INSERT INTO bingo.users(id, username, account_identifier, account_provider, created_at) VALUES
    (gen_random_uuid(), ${username || null}, ${identifier}, ${provider}, NOW())
  `;
}

/**
 * @param user_id
 * @param permission
 * @returns true if the user has permission
 */
export async function checkUserPermission(user_id: string, permission: string) {
  const permResult = await sql`
    SELECT permission
    FROM bingo.user_permissions
    WHERE user_id = ${user_id}
  `.values();

  const perms = permResult.flat();

  return perms.includes(permission);
}

/**
 * @param identifier id from account provider
 * @param provider account provider
 * @returns true if the user exists
 */
export async function doesUserExist(
  identifier: string,
  provider: 'google' | 'reddit',
) {
  const countResult = await sql`
  SELECT COUNT(*) FROM bingo.users WHERE account_identifier = ${identifier} AND account_provider = ${provider}
  `;

  return countResult[0].count !== '0';
}

export async function setUsername(
  username: string,
  identifier: string,
  provider: 'google' | 'reddit',
) {
  await sql`
  UPDATE bingo.users 
  SET username = ${username}
  WHERE account_identifier = ${identifier} AND account_provider = ${provider}`;
}

// returns true if a user by that username exists in the database
export async function isUsernameTaken(username: string) {
  const countResult = await sql`
    SELECT COUNT(*) FROM bingo.users WHERE username = ${username}`;

  return countResult[0].count !== '0';
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

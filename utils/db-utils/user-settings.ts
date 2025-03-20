import sql from '../db';

/**
 * Adds a record to the friends table representing a one-way friend relationship
 * @param user_id user ID of the user adding a friend
 * @param friend_id user ID of the friend being added
 */
export async function insertFriendOfUser(user_id: string, friend_id: string) {
  await sql`
    INSERT INTO bingo.friends (user_id, friend_id, created_at)
    SELECT user_.id, friend_.id, NOW()
    FROM bingo.users AS user_, bingo.users AS friend_
    WHERE user_.id = ${user_id} AND friend_.id = ${friend_id}`;
}

/**
 * Deletes a record from the friends table
 * @param user_id user ID of the user deleting a friend
 * @param friend_id user ID of the friend being deleted
 */
export async function deleteFriendOfUser(user_id: string, friend_id: string) {
  await sql`
    DELETE FROM bingo.friends 
    WHERE user_id = ${user_id} AND friend_id = (SELECT users.id FROM bingo.users WHERE username = ${friend_id})`;
}

// NOT USED; WAIT TO DELETE
// returns list of the users friends
export async function getFriendsOfUser(user_id: string) {
  const friends = await sql`
    SELECT friend_.username AS "friends"
    FROM ((bingo.users user_ INNER JOIN bingo.friends ON user_.id = friends.user_id)
      INNER JOIN bingo.users friend_ ON friend_.id = friends.friend_id)
    WHERE user_.id = ${user_id}`.values();

  return friends.flat();
}

import sql from '../db';

// inserts a new record into the friends table
export async function insertFriendOfUser(user: string, friend: string) {
  await sql`
    INSERT INTO bingo.friends (user_id, friend_id, created_at)
    SELECT user_.id, friend_.id, NOW()
    FROM bingo.users AS user_, bingo.users AS friend_
    WHERE user_.username = ${user} AND friend_.username = ${friend}`;
}

// removes a record from the friends table
export async function deleteFriendOfUser(user_id: string, friend: string) {
  await sql`
    DELETE FROM bingo.friends 
    WHERE user_id = ${user_id} AND friend_id = (SELECT users.id FROM bingo.users WHERE username = ${friend})`;
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

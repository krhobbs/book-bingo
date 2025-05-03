export interface UserResponse {
  ok: boolean;
  message: string;
}

export async function addFriend(
  userID: string,
  friendID: string,
): Promise<UserResponse> {
  const result = await fetch(`/api/users/${userID}`, {
    method: 'POST',
    body: JSON.stringify({ friendID }),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await result.json();

  return { ok: result.ok, message: data.message };
}

export async function deleteFriend(
  userID: string,
  friendID: string,
): Promise<UserResponse> {
  const result = await fetch(`/api/users/${userID}`, {
    method: 'PATCH',
    body: JSON.stringify({ friendID }),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await result.json();

  return { ok: result.ok, message: data.message };
}

export async function setUsername(
  userID: string,
  username: string,
): Promise<UserResponse> {
  const result = await fetch(`/api/users/${userID}`, {
    method: 'PUT',
    body: JSON.stringify({ username }),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await result.json();

  return { ok: result.ok, message: data.message };
}

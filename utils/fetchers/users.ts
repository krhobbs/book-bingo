export async function addFriend(userID: string, friendID: string) {
  await fetch(`/api/users/${userID}`, {
    method: 'POST',
    body: JSON.stringify({ friendID }),
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function deleteFriend(userID: string, friendID: string) {
  await fetch(`/api/users/${userID}`, {
    method: 'PATCH',
    body: JSON.stringify({ friendID }),
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function setUsername(userID: string, username: string) {
  await fetch(`/api/users/${userID}`, {
    method: 'PUT',
    body: JSON.stringify({ username }),
    headers: { 'Content-Type': 'application/json' },
  });
}

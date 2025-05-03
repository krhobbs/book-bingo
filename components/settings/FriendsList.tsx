import React, { FormEvent, useRef, useState } from 'react';
import { Box, Button, Input, Label, Text, IconButton } from 'theme-ui';
import { TrashIcon } from '@heroicons/react/20/solid';
import { ErrorPopup, Spacer } from '../ui';
import type { UserResponse } from '../../utils/fetchers';

export interface Friend {
  username: string;
  id: string;
}

interface FriendsListProps {
  friends: Friend[];
  handleDeleteFriend: (friendID: string) => Promise<UserResponse>;
  handleAddFriend: (friendID: string) => Promise<UserResponse>;
}

function FriendsList({
  friends,
  handleDeleteFriend,
  handleAddFriend,
}: FriendsListProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const newFriendRef = useRef<HTMLInputElement>(null);

  async function onAddFriend(event: FormEvent<HTMLDivElement>) {
    event.preventDefault();

    const enteredNewFriend = newFriendRef?.current?.value;

    if (!enteredNewFriend) {
      throw new Error('Unable to add friend.');
    }

    const result = await handleAddFriend(enteredNewFriend);

    if (!result.ok) {
      setErrorMessage(result.message);
    } else {
      event.target instanceof HTMLFormElement && event.target.reset();
      setErrorMessage('');
      setSuccessMessage('Added friend successfully.');
    }
  }

  async function onDeleteFriend(friendId: string) {
    const result = await handleDeleteFriend(friendId);
    if (!result.ok) {
      setErrorMessage(result.message);
    } else {
      setErrorMessage('');
      setSuccessMessage('Deleted friend successfully.');
    }
  }

  function closeErrorPopup(): void {
    setErrorMessage('');
  }

  return (
    <Box>
      <Text variant="heading2">Friends</Text>
      <Spacer size={['1rem']} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxBlockSize: ['70vh', '55vh'],
          overflowY: 'auto',
        }}
      >
        {friends.map((friend: Friend, index: number) => {
          return (
            <Box
              key={friend.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid white',
                borderBottom: `${index === friends.length - 1 ? '1px solid white' : 'none'
                  }`,
                py: '.8rem',
                minInlineSize: '200px',
              }}
            >
              <Text variant="body1">{friend.username}</Text>
              <IconButton
                sx={{
                  color: 'text',
                  cursor: 'pointer',
                  padding: '0px',
                  width: ['16px', '22px'],
                  height: ['18px', '24px'],
                }}
                onClick={() => onDeleteFriend(friend.id)}
              >
                <TrashIcon style={{ inlineSize: '100%' }} />
              </IconButton>
            </Box>
          );
        })}
      </Box>
      <Spacer size={['2rem']} />
      <Box
        as="form"
        onSubmit={onAddFriend}
        sx={{ display: 'flex', gap: '1rem' }}
      >
        <Box sx={{ display: 'inline', flex: 1 }}>
          <Label htmlFor="add-friend">Add Friend</Label>
          <Input type="text" id="add-friend" ref={newFriendRef} />
        </Box>
        <Button sx={{ display: 'inline', marginTop: '1rem' }}>Add</Button>
      </Box>
      {errorMessage && (
        <ErrorPopup
          message={errorMessage}
          close={closeErrorPopup}
        />
      )}
      {successMessage && (
        <ErrorPopup
          message={successMessage}
          close={() => { setSuccessMessage('') }}
        />
      )}
    </Box>
  );
}

export default FriendsList;

import React, { FormEvent, useRef, useState } from 'react';
import { Box, Button, Input, Label, Text, IconButton } from 'theme-ui';
import { TrashIcon } from '@heroicons/react/20/solid';
import { ErrorPopup, Spacer } from '../ui';

interface FriendsListInterface {
  friends: string[];
  handleDeleteFriend: (friendData: { friendToDelete: string }) => Promise<any>;
  handleAddFriend: (newFriendData: { friendToAdd: string }) => Promise<any>;
}

function FriendsList({
  friends,
  handleDeleteFriend,
  handleAddFriend,
}: FriendsListInterface) {
  const [errorMessage, setErrorMessage] = useState('');
  const newFriendRef = useRef<HTMLInputElement>(null);

  async function onAddFriend(event: FormEvent<HTMLDivElement>) {
    event.preventDefault();

    const enteredNewFriend = newFriendRef?.current?.value;

    if (!enteredNewFriend) {
      throw new Error('Unable to add friend.');
    }

    const result = await handleAddFriend({ friendToAdd: enteredNewFriend });

    if (result !== 'success') {
      setErrorMessage(result);
    } else {
      event.target instanceof HTMLFormElement && event.target.reset();
      setErrorMessage('');
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
        {friends.map((friend: string, index: number) => {
          return (
            <Box
              key={friend}
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
              <Text variant="body1">{friend}</Text>
              <IconButton
                sx={{
                  color: 'text',
                  cursor: 'pointer',
                  padding: '0px',
                  width: ['16px', '22px'],
                  height: ['18px', '24px'],
                }}
                onClick={() => handleDeleteFriend({ friendToDelete: friend })}
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
        <Box sx={{ display: 'inline' }}>
          <Label htmlFor="add-friend">Add Friend</Label>
          <Input type="text" id="add-friend" ref={newFriendRef} />
        </Box>
        <Button sx={{ display: 'inline', marginTop: '1rem' }}>Add</Button>
      </Box>
      {errorMessage && (
        <Box>
          <Spacer size={['2.4rem']} />
          <ErrorPopup
            message={errorMessage}
            close={closeErrorPopup}
            sx={{ margin: 'auto' }}
          ></ErrorPopup>
        </Box>
      )}
    </Box>
  );
}

export default FriendsList;

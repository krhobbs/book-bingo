import React, { useRef } from 'react';
import { Box, Button, Input, Label, Text, IconButton } from 'theme-ui';
import Spacer from './ui/Spacer';
import { TrashIcon } from '@heroicons/react/20/solid';

function FriendsList({ friends, onDeleteFriend, onAddFriend }) {
  const newFriendRef = useRef<HTMLInputElement>();

  function addHandler(event) : void {
    event.preventDefault();

    const enteredNewFriend = newFriendRef.current.value;

    onAddFriend({ friendToAdd: enteredNewFriend })

  }

  return (
    <Box>
      <Text variant="heading2">Friends</Text>
      <Spacer size={['1rem']} />
      <Box sx={{ display: 'flex', flexDirection: 'column', maxBlockSize: ['70vh', '55vh'], overflowX: 'scroll' }}>
        {friends.map((friend, index) => {
          return (
            <Box
              key={friend}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid white',
                borderBottom: `${
                  index === friends.length - 1 ? '1px solid white' : 'none'
                }`,
                py: '.8rem',
                minInlineSize: '200px',
              }}
            >
              <Text>{friend}</Text>
              <IconButton
                sx={{
                  color: 'text',
                  cursor: 'pointer',
                  padding: '0px',
                  width: ['16px', '22px'],
                  height: ['18px', '24px'],
                }}
                onClick={() => onDeleteFriend({friendToDelete: friend})}
              >
                <TrashIcon style={{ inlineSize: '100%' }} />
              </IconButton>
            </Box>
          );
        })}
      </Box>
      <Spacer size={['2rem']} />
      <Box as="form" onSubmit={addHandler} sx={{ display: 'flex', gap: '1rem' }}>
        <Box sx={{ display: 'inline' }}>
          <Label htmlFor="add-friend">Add Friend</Label>
          <Input type="text" id="add-friend" ref={newFriendRef} />
        </Box>
        <Button sx={{ display: 'inline', marginTop: '1rem' }}>Add</Button>
      </Box>
    </Box>
  );
}

export default FriendsList;
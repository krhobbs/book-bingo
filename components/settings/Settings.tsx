import { useState } from 'react';
import { Box, Button, Divider, Text } from 'theme-ui';
import FriendsList from './FriendsList';
import { Modal } from '../ui';
import { useSession, signOut } from 'next-auth/react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Head from 'next/head';

function Settings({ username, friends }: { username: string, friends: string[] }) {
  const [showFriendsList, setShowFriendsList] = useState(false);
  const { update } = useSession();

  async function handleDeleteFriend(friendData: { friendToDelete: string }) {
    const response = await fetch('/api/user/delete-friend', {
      method: 'PATCH',
      body: JSON.stringify(friendData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: { message: string } = await response.json();

    if (response.ok) {
      update();
    }

    return data;
  }

  async function handleAddFriend(newFriendData: { friendToAdd: string }) {
    const response = await fetch('/api/user/add-friend', {
      method: 'POST',
      body: JSON.stringify(newFriendData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: { message: string } = await response.json();

    if (response.ok) {
      update();
      return 'success';
    } else {
      return data.message;
    }
  }

  return (
    <>
      <Head>
        <title>Book Bingo | Settings</title>
      </Head>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mx: 'auto',
          inlineSize: ['100%', '700px'],
          padding: '2rem',
        }}
      >
        <Text
          as="p"
          variant="body1"
          color="muted"
          sx={{ padding: '0.5rem 1rem', textAlign: 'left' }}
        >
          Username: {username}
        </Text>
        <Divider sx={{ py: '0.1rem', opacity: 0.3 }} />
        <Link href="/archived">
          <Box variant="links.settings">Archived</Box>
        </Link>
        <Divider sx={{ py: '0.1rem', opacity: 0.3 }} />
        <Link href="/templates">
          <Box variant="links.settings">Templates</Box>
        </Link>
        <Divider sx={{ py: '0.1rem', opacity: 0.3 }} />
        <Button
          onClick={() => {
            setShowFriendsList(!showFriendsList);
          }}
          variant="settings"
        >
          Add/Delete Friends
        </Button>
        <Divider sx={{ py: '0.1rem', opacity: 0.3 }} />
        <Button onClick={() => signOut({ callbackUrl: '/' })} variant="settings">
          Logout
        </Button>
      </Box>
      {showFriendsList &&
        createPortal(
          <Modal closeModal={() => setShowFriendsList(!showFriendsList)}>
            <FriendsList
              friends={friends}
              handleDeleteFriend={handleDeleteFriend}
              handleAddFriend={handleAddFriend}
            />
          </Modal>,
          document.body,
          'friends',
        )}
    </>
  );
}

export default Settings;

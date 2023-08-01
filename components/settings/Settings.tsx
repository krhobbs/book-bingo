import { useState } from 'react';
import { Box, Button, Divider, Text, Spinner } from 'theme-ui';
import ChangePasswordForm from './ChangePasswordForm';
import FriendsList from './FriendsList';
import Modal from '../ui/Modal';
import { useSession, signOut } from 'next-auth/react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Head from 'next/head';

function Settings() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showFriendsList, setShowFriendsList] = useState(false);
  const { data: session, status, update } = useSession();

  const logoutHandler = () => {
    signOut();
  };

  async function changePasswordHandler(passwordData) {
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      update();
      return 'success';
    } else {
      return data.message;
    }
  }

  async function deleteFriendHandler(friendData) {
    const response = await fetch('/api/user/delete-friend', {
      method: 'PATCH',
      body: JSON.stringify(friendData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      update();
    }

    return data;
  }

  async function addFriendHandler(newFriendData) {
    const response = await fetch('/api/user/add-friend', {
      method: 'POST',
      body: JSON.stringify(newFriendData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      update();
      return 'success';
    } else {
      return data.message;
    }
  }

  if (status === 'unauthenticated') {
    return (
      <Link href="/login">
        <Text
          as="p"
          variant="heading2"
          sx={{ display: 'block', textAlign: 'center', mx: 'auto' }}
        >
          Login
        </Text>
      </Link>
    );
  }

  if (status === 'loading') {
    return <Spinner sx={{ display: 'block', marginInline: 'auto' }} />;
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
          Username: {session.user.username}
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
            setShowChangePassword(false);
          }}
          variant="settings"
        >
          Add/Delete Friends
        </Button>
        <Divider sx={{ py: '0.1rem', opacity: 0.3 }} />
        <Button
          onClick={() => {
            setShowChangePassword(!showChangePassword);
            setShowFriendsList(false);
          }}
          variant="settings"
        >
          Change Password
        </Button>
        <Divider sx={{ py: '0.1rem', opacity: 0.3 }} />
        <Button onClick={logoutHandler} variant="settings">
          Logout
        </Button>
      </Box>
      {showChangePassword &&
        createPortal(
          <Modal closeModal={() => setShowChangePassword(!showChangePassword)}>
            <ChangePasswordForm onChangePassword={changePasswordHandler} />
          </Modal>,
          document.body,
          'change-password'
        )}
      {showFriendsList &&
        createPortal(
          <Modal closeModal={() => setShowFriendsList(!showFriendsList)}>
            <FriendsList
              friends={session.user.friends}
              onDeleteFriend={deleteFriendHandler}
              onAddFriend={addFriendHandler}
            />
          </Modal>,
          document.body,
          'friends'
        )}
    </>
  );
}

export default Settings;

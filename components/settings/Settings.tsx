import { useState } from 'react';
import { Box, Button, Divider, Text } from 'theme-ui';
import ChangePasswordForm from './ChangePasswordForm';
import FriendsList from './FriendsList';
import Modal from '../ui/Modal';
import { useSession, signOut } from 'next-auth/react';
import { createPortal } from 'react-dom';

function Settings() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showFriendsList, setShowFriendsList] = useState(false);
  const { data: session, status } = useSession();

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
      return 'success';
    } else {
      return data.message;
    }
  }

  if (status === 'unauthenticated') {
    return <p>Login</p>;
  }

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <>
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
          sx={{ pl: '1rem', textAlign: 'left' }}
        >
          Username: {session.user.username}
        </Text>
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
      {showChangePassword && createPortal(
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

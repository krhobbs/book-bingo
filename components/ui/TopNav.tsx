import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import {
  Box,
  Divider,
  Text,
  IconButton,
  ThemeUICSSObject,
  Button,
} from 'theme-ui';
import { BookOpenIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import ChangePasswordForm from '../settings/ChangePasswordForm';
import Modal from './Modal';
import FriendsList from '../settings/FriendsList';

const containerStyles: ThemeUICSSObject = {
  alignItems: 'center',
  backgroundColor: 'transparent',
  blockSize: '4.5rem',
  display: 'flex',
  inlineSize: '100%',
  justifyContent: 'space-between',
  padding: ['0 1rem', '0 2rem'],
  position: 'absolute',
  top: '0',
  zIndex: '100',
};

const TEST_FRIENDS = [
  'test',
  'test',
  'test',
  'test',
  'test',
  'test',
  'test',
  'test',
  'test',
  'test',
  'test',
  'test',
  'test',
  'test',
  'test',
  'test',
  'test',
  'test',
  'test',
  'test',
  'test',
  'test',
  'test',
  'test',
  'test',
  'test',
  'test',
];

function TopNav() {
  const { data: session, status } = useSession();
  const [showSettings, setShowSettings] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showFriendsList, setShowFriendsList] = useState(false);

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
      return 'success'
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
      }
    });
    
    const data = await response.json();

    if (response.ok) {
      return 'success'
    } else {
      return data.message;
    }
  }

  return (
    <Box sx={containerStyles}>
      <Link href="/">
        <a>
          <Box
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <IconButton sx={{ padding: 0 }}>
              <BookOpenIcon style={{ inlineSize: '100%' }} />
            </IconButton>
            <Text variant="heading1" sx={{ display: ['none', 'inline'] }}>
              BookBingo
            </Text>
          </Box>
        </a>
      </Link>
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: ['1rem', '2rem'] }}
      >
        {status === 'authenticated' ? (
          <>
            <Link href="/profile">
              <a>
                <Text variant="navLink">Profile</Text>
              </a>
            </Link>
            <Link href="/friends">
              <a>
                <Text variant="navLink">Friends</Text>
              </a>
            </Link>
            <IconButton
              onClick={() => setShowSettings(!showSettings)}
              sx={{ cursor: 'pointer' }}
            >
              <Cog6ToothIcon style={{ inlineSize: '100%' }} />
            </IconButton>
            {showSettings && (
              <Box
                onClick={() => setShowSettings(false)}
                sx={{
                  position: 'absolute',
                  inlineSize: '100%',
                  blockSize: '100vh',
                  top: 0,
                  left: 0,
                  zIndex: 1,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: 'background',
                    borderRadius: '20px',
                    padding: '1.3rem 0.6rem',
                    position: 'absolute',
                    top: '65px',
                    right: ['3px', '16px'],
                    zIndex: 2,
                    boxShadow: (theme) => `1px 1px 0px 2px ${theme.colors.complete}`
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Text variant="body1" sx={{ mx: 'auto' }}>
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
                </Box>
              </Box>
            )}
            {showChangePassword && (
              <Modal
                closeModal={() => setShowChangePassword(!showChangePassword)}
              >
                <ChangePasswordForm onChangePassword={changePasswordHandler} />
              </Modal>
            )}
            {showFriendsList && (
              <Modal closeModal={() => setShowFriendsList(!showFriendsList)}>
                <FriendsList friends={session.user.friends} onDeleteFriend={deleteFriendHandler} onAddFriend={addFriendHandler} />
              </Modal>
            )}
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </Box>
    </Box>
  );
}

export default TopNav;

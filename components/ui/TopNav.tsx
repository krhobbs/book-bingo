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

function TopNav() {
  const { data: session, status } = useSession();
  const [showSettings, setShowSettings] = useState(false);

  const logoutHandler = () => {
    signOut();
  };

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
                    backgroundColor: 'darker',
                    borderRadius: '20px',
                    padding: '1.3rem 0.6rem',
                    position: 'absolute',
                    top: '65px',
                    right: ['3px', '16px'],
                    zIndex: 2,
                    boxShadow: '10px 10px 10px -10px rgba(0,0,0,0.75)',
                    '&::before': {
                      content: "''",
                      display: 'block',
                      width: 0,
                      height: 0,
                      position: 'absolute',
                      borderRight: '8px solid transparent',
                      borderLeft: '8px solid transparent',
                      borderBottom: '8px solid #1c231a',
                      left: ['170px', '182px'],
                      top: '-8px',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Text variant='body1' sx={{mx: 'auto'}}>Username: {session.user.username}</Text>
                    <Divider sx={{ py: '0.1rem', opacity: 0.3 }} />
                    <Button variant="nav">Add/Delete Friends</Button>
                    <Divider sx={{ py: '0.1rem', opacity: 0.3 }} />
                    <Button variant="nav">Change Password</Button>
                    <Divider sx={{ py: '0.1rem', opacity: 0.3 }} />
                    <Button onClick={logoutHandler} variant="nav">
                      Logout
                    </Button>
                  </Box>
                </Box>
              </Box>
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

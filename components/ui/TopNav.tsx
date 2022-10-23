import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Box, Text, IconButton, ThemeUICSSObject } from 'theme-ui';
import { BookOpenIcon } from '@heroicons/react/24/outline';

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

  function logoutHandler() {
    signOut();
  }

  return (
    <Box sx={containerStyles}>
      <Link href="/">
        <a>
          <Box sx={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
            <IconButton sx={{padding: 0}}>
              <BookOpenIcon />
            </IconButton>
            <Text variant="heading1" sx={{ display: ['none', 'inline'] }}>
              BookBingo
            </Text>
          </Box>
        </a>
      </Link>
      <Box sx={{ display: 'flex', gap: ['1rem', '2rem'] }}>
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
            <Box onClick={logoutHandler} sx={{ cursor: 'pointer' }}>
              <Text variant="navLink">Logout</Text>
            </Box>
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

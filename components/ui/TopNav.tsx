import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Box, Text, ThemeUICSSObject } from 'theme-ui';

const containerStyles: ThemeUICSSObject = {
  alignItems: 'center',
  backgroundColor: 'primary',
  blockSize: '4.5rem',
  display: 'flex',
  inlineSize: '100%',
  justifyContent: 'space-between',
  padding: '0 2rem',
  position: 'fixed',
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
          <Box>
            <Text variant={'heading1'}>BookBingo</Text>
          </Box>
        </a>
      </Link>
      <Box sx={{ display: 'flex', gap: '2rem' }}>
        {status === 'authenticated' ? (
          <>
            <Link href="/profile">Profile</Link>
            <Link href="/friends">Friends</Link>
            <Box onClick={logoutHandler}>
              <Text>Logout</Text>
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

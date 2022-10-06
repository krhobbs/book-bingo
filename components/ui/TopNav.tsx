import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Box, Button, Text, ThemeUICSSObject } from 'theme-ui';

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

function TopNav(props) {
  const { data: session, status } = useSession();

  function logoutHandler() {
    signOut();
  }

  return (
    <Box sx={containerStyles}>
      <Box>
        <Text variant={'heading1'}>BookBingo</Text>
      </Box>
      <Box sx={{ display: 'flex', gap: '2rem' }}>
        <Link href="/profile">Profile</Link>
        <Link href="/">Friends</Link>
        {status === 'authenticated' && <Button variant='nav' onClick={logoutHandler}>Logout</Button>}
      </Box>
    </Box>
  );
}

export default TopNav;

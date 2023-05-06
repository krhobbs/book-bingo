import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Box, Text, IconButton, ThemeUICSSObject } from 'theme-ui';
import { BookOpenIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const containerStyles: ThemeUICSSObject = {
  alignItems: 'center',
  backgroundColor: 'transparent',
  blockSize: '4.5rem',
  display: 'flex',
  inlineSize: '100%',
  justifyContent: 'space-between',
  padding: ['0 1rem', '0 2rem'],
  top: '0',
  zIndex: '100',
};

function TopNav() {
  const { status } = useSession();

  return (
    <Box as="nav" sx={containerStyles}>
      <Link href="/">
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
      </Link>
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: ['1rem', '2rem'] }}
      >
        {status === 'authenticated' ? (
          <>
            <Link href="/profile">
              <Text variant="navLink">Profile</Text>
            </Link>
            <Link href="/friends">
              <Text variant="navLink">Friends</Text>
            </Link>
            <Link href="/archived">
              <Text variant="navLink">Archived</Text>
            </Link>
            <Link href="/settings">
              <Cog6ToothIcon style={{width: '24px'}} />
            </Link>
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

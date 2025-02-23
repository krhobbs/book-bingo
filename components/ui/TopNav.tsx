import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  Box,
  Text,
  IconButton,
  ThemeUICSSObject,
  useColorMode,
} from 'theme-ui';
import {
  BookOpenIcon,
  Cog6ToothIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';

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

export function TopNav() {
  const { status } = useSession();
  const [colorMode, setColorMode] = useColorMode();

  return (
    <Box as="nav" sx={containerStyles}>
      <Link href="/" aria-label="home page (see all cards)">
        <Box
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <BookOpenIcon style={{ blockSize: '32px', inlineSize: '32px' }} />
          <Text as="h1" variant="heading1" sx={{ display: ['none', 'inline'] }}>
            BookBingo
          </Text>
        </Box>
      </Link>
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: ['1rem', '2rem'] }}
      >
        {status === 'authenticated' && (
          <>
            <Link href="/profile">Profile</Link>
            <Link href="/friends">Friends</Link>
            <Link href="/settings" style={{ display: 'contents' }}>
              <Cog6ToothIcon
                style={{ blockSize: '24px', inlineSize: '24px' }}
              />
            </Link>
            <IconButton
              onClick={() =>
                setColorMode(colorMode === 'light' ? 'dark' : 'light')
              }
            >
              {colorMode === 'light' ? (
                <MoonIcon style={{ blockSize: '24px', inlineSize: '24px' }} />
              ) : (
                <SunIcon style={{ blockSize: '24px', inlineSize: '24px' }} />
              )}
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
}

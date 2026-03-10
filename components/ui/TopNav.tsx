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
  Cog6ToothIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';

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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <Image src="apple-touch-icon.svg" alt="book bingo logo" width={48} height={48} />
        <Text as="h1" variant="heading1" sx={{ display: ['none', 'inline'] }}>
          BookBingo
        </Text>
      </Box>
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

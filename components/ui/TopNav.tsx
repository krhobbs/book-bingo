import Link from 'next/link';
import { Box, Text, ThemeUICSSObject } from 'theme-ui';

const containerStyles: ThemeUICSSObject = {
  alignItems: 'center',
  backgroundColor: 'primary',
  blockSize: '5rem',
  display: 'flex',
  inlineSize: '100%',
  justifyContent: 'space-between',
  padding: '0 2rem',
  position: 'fixed',
  top: '0',
  zIndex: '100',
};

function TopNav(props) {
  return (
    <Box sx={containerStyles}>
      <Box>
        <Text variant={'heading1'}>BookBingo</Text>
      </Box>
      <Box sx={{ display: 'flex', gap: '2rem' }}>
        <Link href="/profile">Profile</Link>
        <Link href="/">Friends</Link>
      </Box>
    </Box>
  );
}

export default TopNav;

import { Box, Text } from 'theme-ui';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

function NewTemplate() {

  return (
    <Link href="/create-template">
    <Box
      sx={{
        alignItems: 'center',
        blockSize: ['520px', '682px'],
        background: 'transparent',
        border: (theme) => `2px solid ${theme.colors.muted}`,
        borderRadius: '1rem',
        color: 'muted',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        inlineSize: ['95%', '532px'],
        justifyContent: 'center',
        maxInlineSize: '100%',
        mx: 'auto',
      }}
    >
      <Text variant="body2">
        Create Template
      </Text>
      <PlusIcon style={{blockSize: '96px', inlineSize: '96px'}} />
    </Box>
    </Link>
  );
}

export default NewTemplate;

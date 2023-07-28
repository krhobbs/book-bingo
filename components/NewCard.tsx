import { Box, Text } from 'theme-ui';
import { PlusIcon } from '@heroicons/react/24/outline';

function NewCard() {
  async function newCardHandler() {
    const response = await fetch('/api/card/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
  }

  return (
    <Box
      as="button"
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
      onClick={newCardHandler}
    >
      <Text variant="body2">
        New Bingo Card
      </Text>
      <PlusIcon style={{blockSize: '96px', inlineSize: '96px'}} />
    </Box>
  );
}

export default NewCard;

import { Box, Text, IconButton } from 'theme-ui';
import { PlusIcon } from '@heroicons/react/24/outline';

function NewCard() {
  async function newCardHandler() {
    const response = await fetch('/api/cards/add-card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    window.location.reload();
  }

  return (
    <Box
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        blockSize: '682px',
        inlineSize: '532px',
        maxInlineSize: '100%',
        border: (theme) => `2px solid ${theme.colors.muted}`,
        borderRadius: '1rem',
        mx: 'auto',
      }}
      onClick={newCardHandler}
    >
        <Text variant="body2" color="muted">New Bingo Card</Text>
      <IconButton sx={{cursor: 'pointer', height: '128px', width: '128px', color: 'muted'}}>
        <PlusIcon />
      </IconButton>
    </Box>
  );
}

export default NewCard;

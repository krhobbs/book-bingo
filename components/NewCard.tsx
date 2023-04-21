import { Box, Text, IconButton } from 'theme-ui';

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
        border: '2px solid #ABB0B8',
        borderRadius: '1rem',
        mx: 'auto',
      }}
      onClick={newCardHandler}
    >
        <Text color="#ABB0B8">New Bingo Card</Text>
      <IconButton sx={{cursor: 'pointer', height: '128px', width: '128px'}}>
      <svg xmlns="http://www.w3.org/2000/svg" height="128px" viewBox="0 0 24 24" width="128px" fill="#ABB0B8"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
      </IconButton>
    </Box>
  );
}

export default NewCard;

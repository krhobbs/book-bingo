import Spacer from '../ui/Spacer';
import { Box } from 'theme-ui';
import { useSession } from 'next-auth/react';
import BingoCardTitle from './BingoCardTitle';
import BingoCardSquares from './BingoCardSquares';

function BingoCard({ card }: { card: Card }) {
  const { data: session } = useSession();
  const usersCard = session ? card.user === session.user.username : false;

  async function archiveCardHandler() {
    const response = await fetch('/api/cards/archive-card', {
      method: 'POST',
      body: JSON.stringify({
        cardId: card._id,
        archived: card.archived,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      location.reload();
    }
  }

  return (
    <Box
      sx={{
        inlineSize: ['100%', 'min-content'],
        minInlineSize: '320px',
        mx: 'auto',
        px: ['2px', '0'],
      }}
    >
      <BingoCardTitle
        username={card.user}
        usersCard={usersCard}
        archived={card.archived}
        onArchiveCard={archiveCardHandler}
      />
      <Spacer size={['1.25rem', '1.5rem']} />
      <BingoCardSquares
        archived={card.archived}
        cardId={card._id}
        squares={card.squares}
        usersCard={usersCard}
      />
      <Spacer size={['3rem', '4rem']} />
    </Box>
  );
}

export default BingoCard;

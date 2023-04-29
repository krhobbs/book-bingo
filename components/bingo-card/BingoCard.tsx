import Spacer from '../ui/Spacer';
import { Box } from 'theme-ui';
import { Card } from '../Cards';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import BingoCardTitle from './BingoCardTitle';
import BingoCardSquares from './BingoCardSquares';

function BingoCard({ card }: { card: Card }) {
  const { data: session } = useSession();
  const usersCard = session ? card.user === session.user.username : false;
  const router = useRouter();

  async function archiveCardHandler() {
    await fetch('/api/cards/archive-card', {
      method: 'POST',
      body: JSON.stringify({
        cardId: card._id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async function unarchiveCardHandler() {
    await fetch('/api/cards/unarchive-card', {
      method: 'POST',
      body: JSON.stringify({
        cardId: card._id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
        onUnarchiveCard={unarchiveCardHandler}
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

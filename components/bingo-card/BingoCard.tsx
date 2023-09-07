import Spacer from '../ui/Spacer';
import { Box } from 'theme-ui';
import { useSession } from 'next-auth/react';
import BingoCardTitle from './BingoCardTitle';
import BingoCardSquares from './BingoCardSquares';

function BingoCard({ card, mutate }: { card: Card, mutate: Function }) {
  const { data: session } = useSession();
  const usersCard = session ? card.user === session.user.username : false;

  async function archiveCardHandler() {
    const response = await fetch(`/api/card/${card._id}/archive`, {
      method: 'POST',
      body: JSON.stringify({
        archived: card.archived,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    mutate();
  }

  return (
    <Box
      as="article"
      sx={{
        inlineSize: ['100%', 'min-content'],
        minInlineSize: '320px',
        mx: 'auto',
        px: ['0.1rem', '0'],
      }}
    >
      <BingoCardTitle
        username={card.user}
        template={card.template}
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
    </Box>
  );
}

export default BingoCard;

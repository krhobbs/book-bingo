import Spacer from '../ui/Spacer';
import { Box } from 'theme-ui';
import { useSession } from 'next-auth/react';
import BingoCardTitle from './BingoCardTitle';
import BingoCardSquares from './BingoCardSquares';

interface BingoCardProps {
  card: Card;
  handleArchiveCard: Function;
  handleDeleteCard: Function;
  handleUpdateCardSquare: Function;
}

function BingoCard({ card, handleArchiveCard, handleDeleteCard, handleUpdateCardSquare } : BingoCardProps) {
  const { data: session } = useSession();
  const usersCard = session ? card.user === session.user.username : false;

  function archiveCardMiddleware() {
    handleArchiveCard(card);
  }

  function deleteCardMiddleware() {
    handleDeleteCard(card);
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
        handleArchiveCard={archiveCardMiddleware}
        handleDeleteCard={deleteCardMiddleware}
      />
      <Spacer size={['1.25rem', '1.5rem']} />
      <BingoCardSquares
        archived={card.archived}
        cardId={card._id}
        squares={card.squares}
        usersCard={usersCard}
        handleUpdateCardSquare={handleUpdateCardSquare}
      />
    </Box>
  );
}

export default BingoCard;

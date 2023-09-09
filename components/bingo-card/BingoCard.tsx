import Spacer from '../ui/Spacer';
import { Box } from 'theme-ui';
import { useSession } from 'next-auth/react';
import BingoCardTitle from './BingoCardTitle';
import BingoCardSquares from './BingoCardSquares';

interface BingoCardProps {
  card: Card;
  archiveCardHandler: Function;
  deleteCardHandler: Function;
}

function BingoCard({ card, archiveCardHandler, deleteCardHandler } : BingoCardProps) {
  const { data: session } = useSession();
  const usersCard = session ? card.user === session.user.username : false;

  function archiveCardMiddleware() {
    archiveCardHandler(card);
  }

  function deleteCardMiddleware() {
    deleteCardHandler(card);
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
        onArchiveCard={archiveCardMiddleware}
        onDeleteCard={deleteCardMiddleware}
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

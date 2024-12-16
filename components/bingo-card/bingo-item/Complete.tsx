import { Box } from 'theme-ui';
import CompleteBack from './CompleteBack';
import CompleteFront from './CompleteFront';

interface CompleteProps {
  archived: boolean;
  cardId: string;
  usersCard: boolean;
  square: Square;
  handleUpdateCardSquare: UpdateSingleSquareFunction;
  handleFlipCardSquare: (id: number) => void;
  flipped: boolean;
}

function Complete({
  archived,
  cardId,
  usersCard,
  square,
  handleUpdateCardSquare,
  handleFlipCardSquare,
  flipped,
}: CompleteProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        blockSize: '100%',
        inlineSize: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={() => {
        handleFlipCardSquare(Number(square.id));
      }}
    >
      <CompleteBack
        archived={archived}
        cardId={cardId}
        usersCard={usersCard}
        squareId={square.id}
        book={square.book}
        handleUpdateCardSquare={handleUpdateCardSquare}
        flipped={flipped}
      />
      <CompleteFront bookReq={square.req} flipped={flipped} />
    </Box>
  );
}

export default Complete;

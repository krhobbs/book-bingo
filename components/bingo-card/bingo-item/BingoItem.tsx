import { useState } from 'react';
import CompleteFront from './CompleteFront';
import CompleteBack from './CompleteBack';
import Incomplete from './Incomplete';
import { Box } from 'theme-ui';
import Complete from './Complete';
interface BingoItemProps {
  cardId: string;
  archived: boolean;
  usersCard: boolean;
  square: Square;
  handleUpdateCardSquare: Function;
}

function BingoItem({
  archived,
  cardId,
  square,
  usersCard,
  handleUpdateCardSquare,
}: BingoItemProps) {
  const [cardFlipped, setCardFlipped] = useState(false);

  const handleFlip = () => {
    setCardFlipped(!cardFlipped);
  };

  return (
    <Box
      sx={{
        backgroundColor: square.book ? square.color ?? 'accent' : 'secondary',
        textAlign: 'center',
        position: 'relative',
        blockSize: ['100px', '138px'],
        inlineSize: ['auto', '112px'],
        border: (theme) =>
          `solid 1px ${
            square.book
              ? square.color ?? theme.colors.accent
              : theme.colors.secondary
          }`,
        borderRadius: '5px',
        boxShadow: (theme) =>
          `1px 1px 0px 1px ${
            square.book
              ? square.color ?? theme.colors.accent
              : theme.colors.secondary
          }`,
      }}
      onClick={handleFlip}
    >
      {square.book ? (
        <Complete archived={archived} cardId={cardId} usersCard={usersCard} square={square} handleUpdateCardSquare={handleUpdateCardSquare} flipped={cardFlipped} />
      ) : (
        <Incomplete
          archived={archived}
          cardId={cardId}
          bookReq={square.req}
          squareId={square.id}
          usersCard={usersCard}
        />
      )}
    </Box>
  );
}

export default BingoItem;

import { useState } from 'react';
import CompleteFront from './CompleteFront';
import CompleteBack from './CompleteBack';
import Incomplete from './Incomplete';
import { Box } from 'theme-ui';
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
        backgroundColor: 'primary',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        padding: ['0.05rem', '0.1rem'],
      }}
      onClick={handleFlip}
    >
      {square.book ? (
        cardFlipped ? (
          <CompleteBack
            archived={archived}
            cardId={cardId}
            usersCard={usersCard}
            squareId={square.id}
            book={square.book}
            handleUpdateCardSquare={handleUpdateCardSquare}
          />
        ) : (
          <CompleteFront bookReq={square.req} />
        )
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

import Incomplete from './GridIncomplete';
import { Box } from 'theme-ui';
import Complete from './GridComplete';
import type { GridItemProps } from '../BingoItemProps';

function BingoItem({
  archived,
  cardId,
  square,
  usersCard,
  handleUpdateCardSquare,
  handleFlipCardSquare,
  flipped,
}: GridItemProps) {
  return (
    <Box
      sx={{
        backgroundColor: square.book ? (square.color ?? 'accent') : 'secondary',
        textAlign: 'center',
        position: 'relative',
        blockSize: ['100px', '138px'],
        inlineSize: ['auto', '112px'],
        border: (theme) =>
          `solid 1px ${square.book
            ? (square.color ?? theme.colors?.accent)
            : theme.colors?.secondary
          }`,
        borderRadius: '5px',
        boxShadow: (theme) =>
          `1px 1px 0px 1px ${square.book
            ? (square.color ?? theme.colors?.accent)
            : theme.colors?.secondary
          }`,
      }}
    >
      {square.book ? (
        <Complete
          archived={archived}
          cardId={cardId}
          usersCard={usersCard}
          square={square}
          handleUpdateCardSquare={handleUpdateCardSquare}
          handleFlipCardSquare={handleFlipCardSquare}
          flipped={flipped}
        />
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

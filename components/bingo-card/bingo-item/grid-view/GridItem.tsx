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
      variant='layout.gridItem'
      sx={{
        backgroundColor: square.book ? (square.color ?? 'primary') : 'muted',
        border: (theme) =>
          `solid 1px ${square.book
            ? (square.color ?? theme.colors?.accent)
            : theme.colors?.secondary
          }`,
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

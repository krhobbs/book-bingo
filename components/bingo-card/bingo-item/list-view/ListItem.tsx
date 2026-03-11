import { Box } from 'theme-ui';
import ListComplete from './ListComplete';
import ListIncomplete from './ListIncomplete';
import type { ItemProps } from '../BingoItemProps';

function BingoListItem({
  archived,
  cardId,
  square,
  usersCard,
  handleUpdateCardSquare,
}: ItemProps) {
  return (
    <Box
      variant='cards.listItem'
      sx={{
        justifyContent: () => (square?.book?.cover ? 'flex-start' : 'center'),
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
        <ListComplete
          archived={archived}
          cardId={cardId}
          square={square}
          book={square.book}
          req={square.req}
          usersCard={usersCard}
          handleUpdateCardSquare={handleUpdateCardSquare}
        />
      ) : (
        <ListIncomplete
          archived={archived}
          cardId={cardId}
          squareId={square.id}
          req={square.req}
          usersCard={usersCard}
        />
      )}
    </Box>
  );
}

export default BingoListItem;

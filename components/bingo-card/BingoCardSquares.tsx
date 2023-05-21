import BingoItem from './bingo-item/BingoItem';
import { Box } from 'theme-ui';
import { useContext } from 'react';
import { ViewContext } from '../layout/Layout';
import BingoListItem from './bingo-item/list-view/BingoListItem';
export interface BingoCardSquaresProps {
  archived: boolean;
  cardId: string;
  squares: Square[];
  usersCard: boolean;
}

function BingoCardSquares({
  archived,
  cardId,
  squares,
  usersCard,
}: BingoCardSquaresProps) {
  const [listView] = useContext(ViewContext);
  return (
    <>
      {listView ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {squares.map((square: Square) => {
            return (
              <BingoListItem
                key={square.id}
                cardId={cardId}
                archived={archived}
                square={square}
                usersCard={usersCard}
              />
            );
          })}
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gap: ['0.3rem', '0.5rem'],
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridTemplateRows: 'repeat(5, auto)',
          }}
        >
          {squares.map((square: Square) => {
            return (
              <BingoItem
                key={square.id}
                cardId={cardId}
                archived={archived}
                square={square}
                usersCard={usersCard}
              />
            );
          })}
        </Box>
      )}
    </>
  );
}

export default BingoCardSquares;

import BingoItem from './bingo-item/grid-view/GridItem';
import { Box } from 'theme-ui';
import BingoListItem from './bingo-item/list-view/ListItem';
import { useViewContext } from '../../hooks/useViewContext';
export interface BingoCardSquaresProps {
  archived: boolean;
  cardId: string;
  squares: Square[];
  usersCard: boolean;
  handleUpdateCardSquare: UpdateSingleSquareFunction;
  handleFlipCardSquare: (id: number) => void;
  flippedArray: boolean[];
}

function BingoCardSquares({
  archived,
  cardId,
  squares,
  usersCard,
  handleUpdateCardSquare,
  handleFlipCardSquare,
  flippedArray,
}: BingoCardSquaresProps) {
  const { view, setView } = useViewContext();

  return (
    <>
      {view === 'list' ? (
        <Box
          as="section"
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
                handleUpdateCardSquare={handleUpdateCardSquare}
              />
            );
          })}
        </Box>
      ) : (
        <Box
          as="section"
          sx={{
            display: 'grid',
            gap: ['0.3rem', '0.5rem'],
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridTemplateRows: 'repeat(5, auto)',
          }}
        >
          {squares.map((square: Square, idx: number) => {
            return (
              <BingoItem
                key={square.id}
                cardId={cardId}
                archived={archived}
                square={square}
                usersCard={usersCard}
                handleUpdateCardSquare={handleUpdateCardSquare}
                handleFlipCardSquare={handleFlipCardSquare}
                flipped={flippedArray[idx]}
              />
            );
          })}
        </Box>
      )}
    </>
  );
}

export default BingoCardSquares;

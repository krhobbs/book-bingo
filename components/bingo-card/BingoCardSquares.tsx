import BingoItem from './bingo-item/BingoItem';
import { Box } from 'theme-ui';

export interface BingoSquare {
  id: string;
  req: string;
  book?: {
    title: string;
    author: string;
  };
  color?: string;
}

export interface BingoCardSquaresProps {
  archived: boolean;
  cardId: string;
  squares: BingoSquare[];
  usersCard: boolean;
}

function BingoCardSquares({ archived, cardId, squares, usersCard } : BingoCardSquaresProps) {
  return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: 'repeat(5, auto)',
          gap: ['0.3rem', '0.5rem'],
        }}
      >
        {squares.map((square: BingoSquare) => {
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
  );
}

export default BingoCardSquares;

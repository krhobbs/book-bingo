import BingoItem from './bingo-item/BingoItem';
import { Box } from 'theme-ui';

interface BingoSquareProps {
  id: string;
  req: string;
  book?: {
    title: string;
    author: string;
  };
  color?: string;
}

export interface BingoCardSquaresProps {
  id: string;
  archived: boolean;
  user: string;
  squares: [BingoSquareProps];
}

function BingoCardSquares(props) {
  return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: 'repeat(5, auto)',
          gap: ['0.3rem', '0.5rem'],
        }}
      >
        {props.card.squares.map((square: BingoSquareProps) => {
          return (
            <BingoItem
              key={square.id}
              cardId={props.card._id}
              archived={props.card.archived}
              user={props.card.user}
              square={square.id}
              bookReq={square.req}
              book={square.book}
              color={square.color}
            />
          );
        })}
      </Box>
  );
}

export default BingoCardSquares;

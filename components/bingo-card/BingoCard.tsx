import BingoItem from './bingo-item/BingoItem';
import Spacer from '../ui/Spacer';
import { Box, Text } from 'theme-ui';

interface BingoSquareProps {
  id: string;
  req: string;
  book?: {
    title: string;
    author: string;
  };
  color?: string;
}

export interface BingoCardProps {
  id: string;
  user: string;
  squares: [BingoSquareProps];
}

function BingoCard(props) {
  return (
    <Box
      sx={{
        inlineSize: ['100%', 'min-content'],
        minInlineSize: '320px',
        mx: 'auto',
        px: ['2px', '0'],
      }}
    >
      <Text variant={'heading2'}>{props.card.user || 'No name'}</Text>
      <Spacer size={['1.25rem', '1.5rem']} />
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
              user={props.card.user}
              square={square.id}
              bookReq={square.req}
              book={square.book}
              color={square.color}
            />
          );
        })}
      </Box>
      <Spacer size={['3rem', '4rem']} />
    </Box>
  );
}

export default BingoCard;

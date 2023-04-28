import BingoCard, { BingoCardProps } from './bingo-card/BingoCard';
import { Box } from 'theme-ui';
import Spacer from './ui/Spacer';

export interface Card {
  _id: string;
  user: string;
  archived: boolean;
  squares: {
    id: string;
    req: string;
    color?: string;
    book?: {
      title: string;
      author: string;
    }
  }[];
};

function Cards({ cards } : { cards: Card[]}) {
  return (
    <Box>
      {cards.map((card: Card) => {
        return <BingoCard key={card._id} card={card} />;
      })}
    </Box>
  );
}

export default Cards;

import BingoCard from './bingo-card/BingoCard';
import { Box } from 'theme-ui';

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

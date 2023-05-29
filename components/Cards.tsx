import BingoCard from './bingo-card/BingoCard';
import { Flex } from 'theme-ui';

function Cards({ cards } : { cards: Card[]}) {
  return (
    <Flex sx={{flexDirection: 'column', gap: '2rem'}}>
      {cards.map((card: Card) => {
        return <BingoCard key={card._id} card={card} />;
      })}
    </Flex>
  );
}

export default Cards;

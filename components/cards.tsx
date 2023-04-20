import BingoCard, { BingoCardProps } from './bingo-card/BingoCard';
import { Box } from 'theme-ui';
import Spacer from './ui/Spacer';

function Cards(props) {
  return (
    <Box>
      <Spacer size="6.5rem" />
      {props.cards.map((card: BingoCardProps) => {
        return <BingoCard key={card.id} card={card} />;
      })}
    </Box>
  );
}

export default Cards;

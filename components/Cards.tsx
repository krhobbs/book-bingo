import { UpdateSquareProps } from '../utils/api-utils';
import BingoCard from './bingo-card/BingoCard';
import { Flex } from 'theme-ui';

interface CardsProps {
  cards: Card[];
  updateCardOpt: (props: Omit<UpdateSquareProps, "cards">) => Promise<void>;
  deleteCardOpt: (cardID: string) => Promise<void>;
  archiveCardOpt: (cardID: string, archived: boolean) => Promise<void>;
}

function Cards({ cards, updateCardOpt, deleteCardOpt, archiveCardOpt }: CardsProps) {
  const handleArchiveCard = async (card: Card) => {
    try {
      await archiveCardOpt(card.id, !card.archived);
    } catch (e) {
      console.error('Error archiving card.');
    }
  };

  const handleDeleteCard = async (card: Card) => {
    try {
      await deleteCardOpt(card.id);
    } catch (e) {
      console.error('Error deleting card.');
    }
  };

  const handleUpdateCardSquare = async (cardID: string, square: Square) => {
    try {
      await updateCardOpt({ cardID, square });
    } catch (e) {
      console.error('Error updating card.');
    }
  };

  return (
    <Flex sx={{ flexDirection: 'column', gap: '2rem' }}>
      {cards.map((card: Card) => {
        return (
          <BingoCard
            key={card.id}
            card={card}
            handleArchiveCard={handleArchiveCard}
            handleDeleteCard={handleDeleteCard}
            handleUpdateCardSquare={handleUpdateCardSquare}
          />
        );
      })}
    </Flex>
  );
}

export default Cards;

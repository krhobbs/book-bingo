import { updateCardSquare } from '../utils/api-utils';
import { deleteCard, updateCard } from '../utils/fetchers';
import BingoCard from './bingo-card/BingoCard';
import { Flex } from 'theme-ui';

function Cards({ cards, mutate }: { cards: Card[]; mutate: Function }) {
  const handleArchiveCard = async (card: Card) => {
    await updateCard(card.id, !card.archived);
    mutate(cards.filter((c) => c.id !== card.id));
  };

  const handleDeleteCard = async (card: Card) => {
    await deleteCard(card.id);
    mutate(cards.filter((c) => c.id !== card.id));
  };

  const handleUpdateCardSquare = async (cardId: string, squareId: string) => {
    try {
      const [activeCard, otherCards] = await updateCardSquare(
        cards,
        squareId,
        cardId,
      );
      mutate([activeCard, ...otherCards]);
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

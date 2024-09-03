import { updateCardSquare } from '../utils/api-utils';
import BingoCard from './bingo-card/BingoCard';
import { Flex } from 'theme-ui';

function Cards({ cards, mutate }: { cards: Card[]; mutate: Function }) {
  const handleArchiveCard = async (card: Card) => {
    await fetch(`/api/card/${card._id}/archive`, {
      method: 'POST',
      body: JSON.stringify({
        archived: card.archived,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    mutate(cards.filter((c) => c._id !== card._id));
  };

  const handleDeleteCard = async (card: Card) => {
    await fetch(`/api/card/${card._id}/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    mutate(cards.filter((c) => c._id !== card._id));
  };

  const handleUpdateCardSquare = async (cardId: string, squareId: string) => {
    try {
      // Setting the book and color params to null because this deals with deleting a book from a square
      const [activeCard, otherCards] = await updateCardSquare(
        null,
        null,
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
            key={card._id}
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

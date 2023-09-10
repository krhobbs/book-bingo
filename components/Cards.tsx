import BingoCard from './bingo-card/BingoCard';
import { Flex } from 'theme-ui';

function Cards({ cards, mutate } : { cards: Card[], mutate: Function }) {
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
  }

  const handleDeleteCard = async (card: Card) => {
    await fetch(`/api/card/${card._id}/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    mutate(cards.filter((c) => c._id !== card._id));
  }

  return (
    <Flex sx={{flexDirection: 'column', gap: '2rem'}}>
      {cards.map((card: Card) => {
        return <BingoCard key={card._id} card={card} handleArchiveCard={handleArchiveCard} handleDeleteCard={handleDeleteCard} />;
      })}
    </Flex>
  );
}

export default Cards;

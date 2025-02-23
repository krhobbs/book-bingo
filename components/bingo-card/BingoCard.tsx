import { Modal, Spacer } from '../ui';
import { Box, Flex, Text, Button } from 'theme-ui';
import { useSession } from 'next-auth/react';
import BingoCardTitle from './BingoCardTitle';
import BingoCardSquares from './BingoCardSquares';
import { createPortal } from 'react-dom';
import { useState } from 'react';
interface BingoCardProps {
  card: Card;
  handleArchiveCard: (card: Card) => Promise<void>;
  handleDeleteCard: (card: Card) => Promise<void>;
  handleUpdateCardSquare: UpdateSingleSquareFunction;
}

function BingoCard({
  card,
  handleArchiveCard,
  handleDeleteCard,
  handleUpdateCardSquare,
}: BingoCardProps) {
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);
  const [flippedArray, setFlippedArray] = useState<boolean[]>(
    new Array(25).fill(false),
  );

  const { data: session } = useSession();
  const usersCard = session ? card.user === session.user.username : false;

  function archiveCardMiddleware() {
    handleArchiveCard(card);
  }

  function deleteCardMiddleware() {
    setShowConfirmDeletePopup(true);
  }

  function flipAllToFront() {
    setFlippedArray(new Array(25).fill(false));
  }

  function flipAllToBack() {
    setFlippedArray(new Array(25).fill(true));
  }

  function flipSingleItem(id: number) {
    const newFlippedArray = flippedArray.map((value, idx) => {
      return id === idx ? !value : value;
    });
    setFlippedArray(newFlippedArray);
  }

  return (
    <Box
      key={card._id}
      as="article"
      sx={{
        inlineSize: ['100%', 'min-content'],
        minInlineSize: '320px',
        mx: 'auto',
        px: ['0.1rem', '0'],
      }}
    >
      <BingoCardTitle
        card={card}
        username={card.user}
        template={card.template}
        usersCard={usersCard}
        archived={card.archived}
        handleArchiveCard={archiveCardMiddleware}
        handleDeleteCard={deleteCardMiddleware}
        handleFlipToBack={flipAllToBack}
        handleFlipToFront={flipAllToFront}
      />
      <Spacer size={['1.25rem', '1.5rem']} />
      <BingoCardSquares
        archived={card.archived}
        cardId={card._id}
        squares={card.squares}
        usersCard={usersCard}
        handleUpdateCardSquare={handleUpdateCardSquare}
        handleFlipCardSquare={flipSingleItem}
        flippedArray={flippedArray}
      />
      {showConfirmDeletePopup &&
        createPortal(
          <Modal closeModal={() => setShowConfirmDeletePopup(false)}>
            <Flex sx={{ flexDirection: 'column' }}>
              <Text variant="body1">
                Are you sure you want to delete this card? This action cannot be
                undone!
              </Text>
              <Spacer size="0.75rem" />
              <Flex sx={{ gap: '0.9rem' }}>
                <Button
                  onClick={() => {
                    handleDeleteCard(card);
                  }}
                  sx={{ flex: '1 1 0' }}
                >
                  <Text variant="body1">Delete Permanently</Text>
                </Button>
                <Button
                  onClick={() => {
                    setShowConfirmDeletePopup(false);
                  }}
                  sx={{ flex: '1 1 0' }}
                >
                  <Text variant="body1">Cancel</Text>
                </Button>
              </Flex>
            </Flex>
          </Modal>,
          document.body,
          'confirmDeletePopup',
        )}
    </Box>
  );
}

export default BingoCard;

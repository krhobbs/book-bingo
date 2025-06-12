import BookInfo from '../../../book/BookInfo';
import { Box } from 'theme-ui';
import { Spacer } from '../../../ui';
import BookButtons from '../BookButtons';

interface CompleteBackProps {
  archived: boolean;
  cardId: string;
  square: Square;
  usersCard: boolean;
  handleUpdateCardSquare: UpdateSingleSquareFunction;
  flipped: boolean;
}

function CompleteBack({
  cardId,
  usersCard,
  archived,
  square,
  handleUpdateCardSquare,
  flipped,
}: CompleteBackProps) {
  return (
    <Box
      variant="layout.animatedSquareSide"
      sx={{
        transform: flipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
      }}
    >
      <BookInfo book={square.book!} />
      {usersCard && !archived && (
        <>
          <Spacer size={['1.1rem']} />
          <BookButtons
            cardId={cardId}
            square={square}
            sx={{
              blockSize: ['16px', '26px'],
              inlineSize: ['95%', '95%', '90%'],
              position: 'absolute',
              bottom: ['8px', '12px'],
              zIndex: 1,
            }}
            handleUpdateCardSquare={handleUpdateCardSquare}
          />
        </>
      )}
    </Box>
  );
}

export default CompleteBack;

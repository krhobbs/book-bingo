import BookInfo from '../../book/BookInfo';
import { Box } from 'theme-ui';
import Spacer from '../../ui/Spacer';
import BookButtons from './BookButtons';

interface CompleteBackProps {
  archived: boolean;
  book: Book;
  cardId: string;
  squareId: string;
  usersCard: boolean;
}

function CompleteBack({
  cardId,
  usersCard,
  archived,
  squareId,
  book,
}: CompleteBackProps) {
  return (
    <Box
      sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}
    >
      <BookInfo book={book} />
      {usersCard && !archived && (
        <>
          <Spacer size={['1.1rem']} />
          <BookButtons
            cardId={cardId}
            squareId={squareId}
            sx={{
              blockSize: ['16px', '26px'],
              inlineSize: ['95%', '95%', '90%'],
              position: 'absolute',
              bottom: ['8px', '12px'],
              zIndex: 1,
            }}
          />
        </>
      )}
    </Box>
  );
}

export default CompleteBack;

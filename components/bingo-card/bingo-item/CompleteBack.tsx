import BookInfo from '../../book/BookInfo';
import { Box, Button } from 'theme-ui';
import { TrashIcon } from '@heroicons/react/24/outline';
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
  async function removeBookHandler() {
    const response = await fetch('/api/delete-book', {
      method: 'POST',
      body: JSON.stringify({
        cardId: cardId,
        squareId: squareId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) location.reload();
  }

  return (
    <Box
      sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}
    >
      <BookInfo book={book} />
      {usersCard && !archived && (
        <>
          <Spacer size={['1.1rem']} />
          <BookButtons cardId={cardId} squareId={squareId} removeBook={removeBookHandler} />
        </>
      )}
    </Box>
  );
}

export default CompleteBack;

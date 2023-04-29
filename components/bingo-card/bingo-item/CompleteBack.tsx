import BookInfo from '../../book/book-info';
import { Box, Button } from 'theme-ui';
import { TrashIcon } from '@heroicons/react/24/outline';
import Spacer from '../../ui/Spacer';

interface CompleteBackProps {
  archived: boolean;
  book: {
    title: string;
    author: string;
  };
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
          <Button
            variant="bingoItem"
            sx={{background: 'destructive'}}
            onClick={removeBookHandler}
          >
            <TrashIcon style={{ blockSize: '98%' }} />
          </Button>
        </>
      )}
    </Box>
  );
}

export default CompleteBack;

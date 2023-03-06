import BookInfo from '../../book/book-info';
import { Box, Button } from 'theme-ui';
import { useSession } from 'next-auth/react';
import { TrashIcon } from '@heroicons/react/24/outline';
import Spacer from '../../ui/Spacer';

interface CompleteBackProps {
  user: string;
  square: string;
  book: {
    title: string;
    author: string;
  };
}

function CompleteBack({ user, square, book }: CompleteBackProps) {
  const { data: session, status } = useSession();

  const usersCard = session ? user === session.user.username : false;

  async function removeBookHandler() {
    await fetch('/api/delete-book', {
      method: 'POST',
      body: JSON.stringify({
        user: user,
        square: square,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return (
    <Box
      sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}
    >
      <BookInfo book={book} />
      {usersCard && (
        <>
          <Spacer size={['1.1rem']} />
          <Button
            sx={{
              backgroundColor: 'destructive',
              color: '#17202a',
              cursor: 'pointer',
              position: 'absolute',
              bottom: ['8px', '12px'],
              padding: '0px',
              inlineSize: ['38px', '60px'],
              blockSize: ['16px', '26px'],
            }}
            onClick={removeBookHandler}
          >
            <TrashIcon style={{ blockSize: '100%' }} />
          </Button>
        </>
      )}
    </Box>
  );
}

export default CompleteBack;

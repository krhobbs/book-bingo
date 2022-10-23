import BookInfo from '../book/book-info';
import { Box, Button, IconButton, Text } from 'theme-ui';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/24/outline';

interface ItemBackProps {
  user: string;
  square: string;
  book: {
    title: string;
    author: string;
  };
}

function ItemBack({ user, square, book }: ItemBackProps) {
  const { data: session, status } = useSession();

  const usersCard =  session ? user === session.user.username : false;

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
    <>
      {book ? (
        <Box>
          {usersCard && (
            <IconButton
              sx={{
                backgroundColor: 'secondary',
                color: '#17202a',
                cursor: 'pointer',
                padding: '0px',
                position: 'absolute',
                top: '0.3rem',
                right: '0.3rem',
                width: ['16px', '22px'],
                height: ['18px', '24px'],
              }}
              onClick={removeBookHandler}
            >
              <TrashIcon />
            </IconButton>
          )}
          <BookInfo book={book} />
        </Box>
      ) : (
        <Box>
          {usersCard && (
            <Link
              href={{
                pathname: '/addBook',
                query: {
                  square: square,
                },
              }}
              passHref
            >
              <Button variant="addBook"><Text variant="body1Light">Add Book</Text></Button>
            </Link>
          )}
        </Box>
      )}
    </>
  );
}

export default ItemBack;

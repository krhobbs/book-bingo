import { PlusIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Box, Button, Text } from 'theme-ui';
import Spacer from '../ui/Spacer';

interface IncompleteProps {
  bookReq: string;
  square: string;
  user: string;
}

function CompleteFront({ bookReq, square, user }: IncompleteProps) {
  const { data: session, status } = useSession();
  const usersCard = session ? user === session.user.username : false;

  return (
    <Box
      sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}
    >
      <Text variant="body1">{bookReq}</Text>
      {usersCard && (
        <>
          <Spacer size={['1rem']} />
          <Link
            href={{
              pathname: '/addBook',
              query: {
                square: square,
              },
            }}
            passHref
          >
            <Button
              sx={{
                backgroundColor: 'complete',
                color: '#17202a',
                cursor: 'pointer',
                position: 'absolute',
                bottom: ['8px', '12px'],
                padding: '0px',
                inlineSize: ['38px', '60px'],
                blockSize: ['16px', '26px'],
              }}
            >
              <PlusIcon style={{ blockSize: '100%' }} />
            </Button>
          </Link>
        </>
      )}
    </Box>
  );
}

export default CompleteFront;

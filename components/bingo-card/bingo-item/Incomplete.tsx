import { PlusIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Box, Button, Text } from 'theme-ui';
import Spacer from '../../ui/Spacer';

interface IncompleteProps {
  archived: boolean;
  cardId: string;
  bookReq: string;
  square: string;
  user: string;
}

function Incomplete({ archived, cardId, bookReq, square, user }: IncompleteProps) {
  const { data: session, status } = useSession();
  const usersCard = session ? user === session.user.username : false;

  return (
    <Box
      sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}
    >
      <Text variant="body1">{bookReq}</Text>
      {usersCard && !archived && (
        <>
          <Spacer size={['1rem']} />
          <Link
            href={{
              pathname: '/addBook',
              query: {
                card: cardId,
                square: square,
              },
            }}
            passHref
          >
            <Button
              variant="bingoItemButton"
              sx={{
                backgroundColor: 'secondary',
                color: 'text',
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

export default Incomplete;

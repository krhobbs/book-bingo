import { PlusIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Box, IconButton, Text } from 'theme-ui';
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
      <Text variant="body1Light" as="p">
        {bookReq}
      </Text>
      {usersCard && (
        <>
          <Spacer size="0.5rem" />
          <Link
            href={{
              pathname: '/addBook',
              query: {
                square: square,
              },
            }}
            passHref
          >
            <IconButton
              sx={{
                backgroundColor: 'secondary',
                color: '#17202a',
                cursor: 'pointer',
                padding: '0px',
                inlineSize: '100%',
                height: ['20px', '26px'],
              }}
            >
              <PlusIcon style={{ blockSize: '100%' }} />
            </IconButton>
          </Link>
        </>
      )}
    </Box>
  );
}

export default CompleteFront;

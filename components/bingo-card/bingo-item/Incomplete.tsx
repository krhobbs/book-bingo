import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Box, Text } from 'theme-ui';
import Spacer from '../../ui/Spacer';
import { useRouter } from 'next/router';

interface IncompleteProps {
  archived: boolean;
  cardId: string;
  bookReq: string;
  squareId: string;
  usersCard: boolean;
}

function Incomplete({
  archived,
  cardId,
  bookReq,
  squareId,
  usersCard,
}: IncompleteProps) {
  const { pathname } = useRouter();
  
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
              pathname: '/add-book',
              query: {
                card: cardId,
                square: squareId,
                fromPage: pathname.includes('profile') ? 'profile' : 'home'
              },
            }}
            aria-label="add new book"
          >
            <Box
              variant="links.item"
              sx={{
                bottom: ['8px', '12px'],
                left: '0px',
                marginInline: 'auto',
                position: 'absolute',
                right: '0px',
              }}
            >
              <PlusIcon style={{ blockSize: '100%' }} />
            </Box>
          </Link>
        </>
      )}
    </Box>
  );
}

export default Incomplete;

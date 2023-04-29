import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Box, Button, Text } from 'theme-ui';
import Spacer from '../../ui/Spacer';

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
              },
            }}
            passHref
          >
            <Button variant="bingoItem">
              <PlusIcon style={{ blockSize: '100%' }} />
            </Button>
          </Link>
        </>
      )}
    </Box>
  );
}

export default Incomplete;

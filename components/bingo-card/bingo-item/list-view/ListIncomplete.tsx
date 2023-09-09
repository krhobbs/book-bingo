import PlusIcon from '@heroicons/react/24/outline/PlusIcon';
import Link from 'next/link';
import { Box, Text } from 'theme-ui';
import Spacer from '../../../ui/Spacer';

interface ListIncompleteProps {
  archived: boolean;
  cardId: string;
  req: string;
  squareId: string;
  usersCard: boolean;
}

function ListIncomplete({
  archived,
  cardId,
  req,
  squareId,
  usersCard,
}: ListIncompleteProps) {
  return (
    <Box
      sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}
    >
      <Text as="h3" variant="subheading" sx={{ textAlign: 'center' }}>
        {req}
      </Text>
      {!archived && usersCard && (
        <>
          <Spacer size="1rem" />
          <Link
            href={{
              pathname: '/add-book',
              query: {
                card: cardId,
                square: squareId,
                fromPage: 'home'
              },
            }}
            aria-label="add new book"
          >
            <Box variant="links.item">
              <PlusIcon style={{ blockSize: '100%' }} />
            </Box>
          </Link>
        </>
      )}
    </Box>
  );
}

export default ListIncomplete;

import PlusIcon from '@heroicons/react/24/outline/PlusIcon';
import Link from 'next/link';
import { Box, Button, Text } from 'theme-ui';
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
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Text as="h3" variant="navLink" sx={{textAlign: 'center'}}>
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
              },
            }}
            passHref
            style={{ display: 'flex' }}
          >
            <Button
              sx={{
                background: 'secondary',
                inlineSize: ['38px', '60px'],
                blockSize: ['16px', '26px'],
                padding: '0px',
                marginInline: 'auto',
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

export default ListIncomplete;

import { Box, Text } from 'theme-ui';
import { Spacer } from '../../../ui';
import { useRouter } from 'next/router';
import { paramToNumber } from '../../../../utils/param-utils';
import AddBookLink from '../AddBookLink';

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
  const { query } = useRouter();
  const page = paramToNumber(query.page) ?? 1;

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
          <AddBookLink cardId={cardId} squareId={squareId} page={page} />
        </>
      )}
    </Box>
  );
}

export default ListIncomplete;

import { Box, Text } from 'theme-ui';
import { Spacer } from '../../../ui';
import { useRouter } from 'next/router';
import AddBookLink from '../AddBookLink';
import { paramToNumber } from '../../../../utils/param-utils';

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
  const { pathname, query } = useRouter();
  const page = paramToNumber(query.page) ?? 1;

  return (
    <Box variant="layout.squareSide">
      <Text variant="body1">{bookReq}</Text>
      {usersCard && !archived && (
        <>
          <Spacer size={['1rem']} />
          <AddBookLink cardId={cardId} squareId={squareId} pathname={pathname} page={page} />
        </>
      )}
    </Box>
  );
}

export default Incomplete;

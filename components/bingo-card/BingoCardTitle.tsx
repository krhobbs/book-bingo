import { Box, Text } from 'theme-ui';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import Spacer from '../ui/Spacer';
import CardButtons from './CardButtons';

interface BingoCardTitleProps {
  username: string;
  template: string;
  usersCard: boolean;
  archived: boolean;
  onArchiveCard: Function;
  onDeleteCard: Function;
}

function BingoCardTitle({
  username,
  template,
  usersCard,
  archived,
  onArchiveCard,
  onDeleteCard
}: BingoCardTitleProps) {
  const { asPath } = useRouter();

  const showUsername = useMemo(
    () => asPath === '/' || asPath === '/friends',
    [asPath]
  );
  const showCardButtons = useMemo(
    () => (asPath === '/profile' || asPath === '/archived') && usersCard,
    [asPath, usersCard]
  );

  return (
    <Box
      as="section"
      sx={{ alignItems: 'center', display: 'flex', gap: '1.5rem', justifyContent: 'space-between', px: ['0rem', '0.2rem'] }}
    >
      <Box>
        {showUsername && (
          <Text as="h2" variant="heading2">
            {username}
          </Text>
        )}
        <Spacer size="0.3rem" />
        <Text as="h2" variant={showUsername ? "subheading" : "heading2"}>{template}</Text>
      </Box>
      {showCardButtons && (
        <CardButtons handleDelete={onDeleteCard} handleArchive={onArchiveCard} archived={archived} />
      )}
    </Box>
  );
}

export default BingoCardTitle;

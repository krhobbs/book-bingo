import { Box, Button, Text } from 'theme-ui';
import {
  ArchiveBoxIcon,
  ArrowUturnLeftIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

interface BingoCardTitleProps {
  username: string;
  usersCard: boolean;
  archived: boolean;
  onArchiveCard: Function;
}

function BingoCardTitle({
  username,
  usersCard,
  archived,
  onArchiveCard,
}: BingoCardTitleProps) {
  const { asPath } = useRouter();

  const showUsername = useMemo(
    () => asPath === '/' || asPath === '/friends',
    [asPath]
  );
  const showArchiveButton = useMemo(
    () => (asPath === '/profile' || asPath === '/archived') && usersCard,
    [asPath, usersCard]
  );

  return (
    <Box sx={{ alignItems: 'center', display: 'flex', gap: '1.5rem' }}>
      {showUsername && (
        <Text as="h2" variant="heading2">{username || 'No name'}</Text>
      )}
      {showArchiveButton && (
        <Button variant="primary" onClick={() => onArchiveCard()}>
          {archived ? (
            <ArrowUturnLeftIcon style={{ blockSize: '24px' }} />
          ) : (
            <ArchiveBoxIcon style={{ blockSize: '24px' }} />
          )}
        </Button>
      )}
    </Box>
  );
}

export default BingoCardTitle;

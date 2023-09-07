import { Box, Button, Text } from 'theme-ui';
import {
  ArchiveBoxIcon,
  ArrowUturnLeftIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import Spacer from '../ui/Spacer';

interface BingoCardTitleProps {
  username: string;
  template: string;
  usersCard: boolean;
  archived: boolean;
  onArchiveCard: Function;
}

function BingoCardTitle({
  username,
  template,
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
      {showArchiveButton && (
        <Button
          variant="primary"
          onClick={() => onArchiveCard()}
          aria-label={`${archived ? 'unarchive' : 'archive'} card`}
        >
          {archived ? (
            <ArrowUturnLeftIcon style={{ blockSize: '22px' }} />
          ) : (
            <ArchiveBoxIcon style={{ blockSize: '22px' }} />
          )}
        </Button>
      )}
    </Box>
  );
}

export default BingoCardTitle;

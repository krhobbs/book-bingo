import { Box, Button, Text } from 'theme-ui';
import {
  ArchiveBoxIcon,
  ArrowUturnLeftIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

interface BingoCardTitleProps {
  username: string;
  usersCard: boolean;
  archived: boolean;
  onArchiveCard: Function;
  onUnarchiveCard: Function;
}

function BingoCardTitle({
  username,
  usersCard,
  archived,
  onArchiveCard,
  onUnarchiveCard,
}: BingoCardTitleProps) {
  const router = useRouter();

  return (
    <Box sx={{ alignItems: 'center', display: 'flex', gap: '1.5rem' }}>
      {router.asPath !== '/profile' && router.asPath !== '/archived' && (
        <Text variant={'heading2'}>{username || 'No name'}</Text>
      )}
      {usersCard && !archived && router.asPath !== '/' && (
        <>
          <Button
            sx={{
              backgroundColor: 'primary',
              color: 'text',
              cursor: 'pointer',
              padding: '0px',
              inlineSize: '100%',
              blockSize: ['16px', '26px'],
            }}
            onClick={() => onArchiveCard}
          >
            <ArchiveBoxIcon style={{ blockSize: '98%' }} />
          </Button>
        </>
      )}
      {usersCard && archived && (
        <>
          <Button
            sx={{
              backgroundColor: 'primary',
              color: 'text',
              cursor: 'pointer',
              padding: '0px',
              inlineSize: '100%',
              blockSize: ['16px', '26px'],
            }}
            onClick={() => onUnarchiveCard}
          >
            <ArrowUturnLeftIcon style={{ blockSize: '80%' }} />
          </Button>
        </>
      )}
    </Box>
  );
}

export default BingoCardTitle;

import {
  TrashIcon,
  ArchiveBoxIcon,
  ArrowUturnLeftIcon,
} from '@heroicons/react/24/outline';
import { useMemo } from 'react';
import { Box, Button, ThemeUIStyleObject } from 'theme-ui';
import useBreakpoint from '../../hooks/useBreakpoint';

interface CardButtonsProps {
  handleDeleteCard: Function;
  handleArchiveCard: Function;
  archived: boolean;
  sx?: ThemeUIStyleObject;
}

function CardButtons({
  handleDeleteCard,
  handleArchiveCard,
  archived,
  sx,
}: CardButtonsProps) {
  const breakpoint = useBreakpoint();
  const iconSize = useMemo(
    () => (breakpoint === 'sm' ? '14px' : '18px'),
    [breakpoint]
  );

  return (
    <Box
      sx={{
        display: 'flex',
        ...sx,
      }}
    >
      <Button
        sx={{
          alignItems: 'center',
          background: 'destructive',
          borderRadius: '4px 0px 0px 4px',
          display: 'flex',
          flex: '1 1 0px',
          justifyContent: 'center',
          paddingBlock: '0.3rem',
        }}
        onClick={() => handleDeleteCard()}
        aria-label="delete card"
      >
        <TrashIcon style={{ inlineSize: iconSize, blockSize: iconSize }} />
      </Button>
      <Button
        sx={{
          alignItems: 'center',
          background: 'muted',
          borderRadius: '0px 4px 4px 0px',
          display: 'flex',
          flex: '1 1 0px',
          justifyContent: 'center',
          paddingBlock: '0.3rem',
        }}
        onClick={() => handleArchiveCard()}
        aria-label={`${archived ? 'unarchive' : 'archive'} card`}
      >
        {archived ? (
          <ArrowUturnLeftIcon
            style={{ inlineSize: iconSize, blockSize: iconSize }}
          />
        ) : (
          <ArchiveBoxIcon
            style={{ inlineSize: iconSize, blockSize: iconSize }}
          />
        )}
      </Button>
    </Box>
  );
}

export default CardButtons;

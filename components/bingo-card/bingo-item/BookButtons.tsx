import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useMemo } from 'react';
import { Box, Button, ThemeUIStyleObject } from 'theme-ui';
import useBreakpoint from '../../../hooks/useBreakpoint';
import { useRouter } from 'next/router';

interface BookButtonsProps {
  cardId: string;
  squareId: string;
  sx?: ThemeUIStyleObject;
  handleUpdateCardSquare: (cardId: string, squareId: string) => Promise<void>;
}

function BookButtons({
  cardId,
  squareId,
  sx,
  handleUpdateCardSquare,
}: BookButtonsProps) {
  const breakpoint = useBreakpoint();
  const { query } = useRouter();
  const iconSize = useMemo(
    () => (breakpoint === 'sm' ? '14px' : '18px'),
    [breakpoint],
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
          borderRadius: '2px 0px 0px 2px',
          display: 'flex',
          flex: '1 1 0px',
          justifyContent: 'center',
          padding: '0px',
        }}
        onClick={() => handleUpdateCardSquare(cardId, squareId)}
        aria-label="delete book from square"
      >
        <TrashIcon style={{ inlineSize: iconSize, blockSize: iconSize }} />
      </Button>
      <Link
        href={{
          pathname: '/edit-book',
          query: {
            card: cardId,
            square: squareId,
            fromPageNum: query.page || '1',
          },
        }}
        style={{ display: 'contents' }}
        aria-label="edit square"
      >
        <Box
          sx={{
            alignItems: 'center',
            background: 'muted',
            borderRadius: '0px 2px 2px 0px',
            display: 'flex',
            flex: '1 1 0px',
            justifyContent: 'center',
            '&:hover': {
              boxShadow: 'pushedIn',
            },
          }}
        >
          <PencilIcon style={{ inlineSize: iconSize, blockSize: iconSize }} />
        </Box>
      </Link>
    </Box>
  );
}

export default BookButtons;

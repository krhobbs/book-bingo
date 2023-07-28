import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useMemo } from 'react';
import { Box, Button, ThemeUIStyleObject } from 'theme-ui';
import useBreakpoint from '../../../hooks/useBreakpoint';

interface BookButtonsProps {
  cardId: string;
  squareId: string;
  sx?: ThemeUIStyleObject;
}

function BookButtons({ cardId, squareId, sx }: BookButtonsProps) {
  const breakpoint = useBreakpoint();
  const iconSize = useMemo(
    () => (breakpoint === 'sm' ? '14px' : '18px'),
    [breakpoint]
  );

  async function removeBookHandler() {
    await fetch(`/api/card/${cardId}/delete-book`, {
      method: 'POST',
      body: JSON.stringify({
        squareId: squareId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

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
          padding: '0px',
        }}
        onClick={removeBookHandler}
        aria-label="delete book from square"
      >
        <TrashIcon
          style={{ inlineSize: iconSize, blockSize: iconSize }}
        />
      </Button>
      <Link
        href={{
          pathname: '/edit-book',
          query: {
            card: cardId,
            square: squareId,
          },
        }}
        style={{ display: 'contents' }}
        aria-label="edit square"
      >
        <Box
          sx={{
            alignItems: 'center',
            background: 'muted',
            borderRadius: '0px 4px 4px 0px',
            display: 'flex',
            flex: '1 1 0px',
            justifyContent: 'center',
            '&:hover': {
              boxShadow: 'pushedIn',
            },
          }}
        >
          <PencilIcon
            style={{ inlineSize: iconSize, blockSize: iconSize }}
          />
        </Box>
      </Link>
    </Box>
  );
}

export default BookButtons;

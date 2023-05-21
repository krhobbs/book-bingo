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
    const response = await fetch('/api/delete-book', {
      method: 'POST',
      body: JSON.stringify({
        cardId: cardId,
        squareId: squareId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) location.reload();
  }

  return (
    <Box
      sx={{
        display: 'flex',
        ...sx
      }}
    >
      <Button
        sx={{
          alignItems: 'center',
          background: 'destructive',
          border: 'none',
          borderRadius: '4px 0px 0px 4px',
          color: 'text',
          cursor: 'pointer',
          display: 'flex',
          flex: '1 1 0px',
          justifyContent: 'center',
          padding: '0px',
        }}
        onClick={removeBookHandler}
      >
        <TrashIcon style={{ inlineSize: iconSize, blockSize: iconSize }} />
      </Button>
      <Link
        href={{
          pathname: '/edit-book',
          query: {
            card: cardId,
            square: squareId
          }
        }}
        style={{ display: 'contents' }}
      >
        <Box
          sx={{
            background: 'muted',
            borderTopRightRadius: '4px',
            borderBottomRightRadius: '4px',
            flex: '1 1 0px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PencilIcon style={{ inlineSize: iconSize, blockSize: iconSize }} />
        </Box>
      </Link>
    </Box>
  );
}

export default BookButtons;

import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useMemo } from 'react';
import { Box, Button } from 'theme-ui';
import useBreakpoint from '../../../hooks/useBreakpoint';

interface BookButtonsProps {
  cardId: string;
  squareId: string;
}

function BookButtons({ cardId, squareId }: BookButtonsProps) {
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
        blockSize: ['16px', '26px'],
        inlineSize: ['95%', '95%', '90%'],
        position: 'absolute',
        bottom: ['8px', '12px'],
        zIndex: 1
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

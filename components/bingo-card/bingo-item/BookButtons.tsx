import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useMemo } from 'react';
import { Box, Button, ThemeUIStyleObject } from 'theme-ui';
import useBreakpoint from '../../../hooks/useBreakpoint';
import { useSWRConfig } from 'swr';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

interface BookButtonsProps {
  cardId: string;
  squareId: string;
  sx?: ThemeUIStyleObject;
  handleUpdateCardSquare: Function
}

function BookButtons({ cardId, squareId, sx, handleUpdateCardSquare }: BookButtonsProps) {
  const breakpoint = useBreakpoint();
  const { pathname } = useRouter();
  const iconSize = useMemo(
    () => (breakpoint === 'sm' ? '14px' : '18px'),
    [breakpoint]
  );
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();

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
        onClick={() => handleUpdateCardSquare(cardId, squareId)}
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
            fromPage: pathname.includes('profile') ? 'profile' : 'home'
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

import { Box } from 'theme-ui';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

interface AddBookLinkProps {
  cardId: string;
  squareId: string;
  pathname: string;
  page: number;
}

export default function AddBookLink({ cardId, squareId, pathname, page = 1 }: AddBookLinkProps) {
  return <Link
    href={{
      pathname: '/add-book',
      query: {
        card: cardId,
        square: squareId,
        fromPage: pathname.includes('profile') ? 'profile' : 'home',
        fromPageNum: page.toString() || '1',
      },
    }}
    aria-label="add new book"
  >
    <Box
      variant="links.item"
      sx={{
        bottom: ['8px', '12px'],
        left: '0px',
        marginInline: 'auto',
        position: 'absolute',
        right: '0px',
      }}
    >
      <PlusIcon style={{ blockSize: '100%' }} />
    </Box>
  </Link>
}
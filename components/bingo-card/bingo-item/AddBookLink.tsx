import { Box } from 'theme-ui';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

interface AddBookLinkProps {
  cardId: string;
  squareId: string;
  page: number;
}

export default function AddBookLink({ cardId, squareId, page }: AddBookLinkProps) {
  return <Link
    href={{
      pathname: '/edit-book',
      query: {
        card: cardId,
        square: squareId,
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
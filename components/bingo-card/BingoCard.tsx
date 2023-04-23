import BingoItem from './bingo-item/BingoItem';
import Spacer from '../ui/Spacer';
import { Box, Button, Text } from 'theme-ui';
import { useSession } from 'next-auth/react';
import { ArchiveBoxIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

interface BingoSquareProps {
  id: string;
  req: string;
  book?: {
    title: string;
    author: string;
  };
  color?: string;
}

export interface BingoCardProps {
  id: string;
  archived: boolean;
  user: string;
  squares: [BingoSquareProps];
}

function BingoCard(props) {
  const { data: session, status } = useSession();
  const usersCard = session ? props.card.user === session.user.username : false;
  const router = useRouter();

  async function archiveCardHandler() {
    await fetch('/api/cards/archive-card', {
      method: 'POST',
      body: JSON.stringify({
        cardId: props.card._id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async function unarchiveCardHandler() {
    await fetch('/api/cards/unarchive-card', {
      method: 'POST',
      body: JSON.stringify({
        cardId: props.card._id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  return (
    <Box
      sx={{
        inlineSize: ['100%', 'min-content'],
        minInlineSize: '320px',
        mx: 'auto',
        px: ['2px', '0'],
      }}
    >
      <Box sx={{alignItems: 'center', display: 'flex', gap: '1.5rem'}}>
        <Text variant={'heading2'}>{props.card.user || 'No name'}</Text>
        {usersCard && !props.card.archived && router.asPath !== '/' && (
          <>
            <Button
              sx={{
                backgroundColor: 'primary',
                color: 'text',
                cursor: 'pointer',
                padding: '0px',
                inlineSize: ['38px', '60px'],
                blockSize: ['16px', '26px'],
              }}
              onClick={archiveCardHandler}
            >
              <ArchiveBoxIcon style={{ blockSize: '98%' }} />
            </Button>
          </>
        )}
        {usersCard && props.card.archived && (
          <>
          <Button
              sx={{
                backgroundColor: 'primary',
                color: 'text',
                cursor: 'pointer',
                padding: '0px',
                inlineSize: ['38px', '60px'],
                blockSize: ['16px', '26px'],
              }}
              onClick={unarchiveCardHandler}
            >
              <ArrowUturnLeftIcon style={{ blockSize: '80%' }} />
            </Button>
          </>
        )}
      </Box>
      <Spacer size={['1.25rem', '1.5rem']} />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: 'repeat(5, auto)',
          gap: ['0.3rem', '0.5rem'],
        }}
      >
        {props.card.squares.map((square: BingoSquareProps) => {
          return (
            <BingoItem
              key={square.id}
              cardId={props.card._id}
              archived={props.card.archived}
              user={props.card.user}
              square={square.id}
              bookReq={square.req}
              book={square.book}
              color={square.color}
            />
          );
        })}
      </Box>
      <Spacer size={['3rem', '4rem']} />
    </Box>
  );
}

export default BingoCard;

import { useState } from 'react';
import CompleteFront from './CompleteFront';
import CompleteBack from './CompleteBack';
import Incomplete from './Incomplete';
import { Box } from 'theme-ui';

interface BingoItemProps {
  cardId: string;
  user: string;
  square: string;
  bookReq: string;
  book: {
    title: string;
    author: string;
  };
  color?: string;
}

function BingoItem({ cardId, user, square, bookReq, book, color }: BingoItemProps) {
  const [cardFlipped, setCardFlipped] = useState(false);

  const handleFlip = () => {
    setCardFlipped(!cardFlipped);
  };

  return (
    <Box
      sx={{
        backgroundColor: 'primary',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        blockSize: ['98px', '138px'],
        inlineSize: ['auto', '112px'],
        border: (theme) => `solid 1px ${book ? color ?? theme.colors.accent : theme.colors.secondary}`,
        borderRadius: '5px',
        boxShadow: (theme) => `1px 1px 0px 1px ${ book ? color ?? theme.colors.accent : theme.colors.secondary}`,
        padding: ['0.05rem', '0.1rem'],
      }}
      onClick={handleFlip}
    >
      {book ? (
        cardFlipped ? <CompleteBack user={user} square={square} book={book} /> : <CompleteFront bookReq={bookReq} />
      ) : (
        <Incomplete cardId={cardId} bookReq={bookReq} square={square} user={user} />
      )}
    </Box>
  );
}

export default BingoItem;

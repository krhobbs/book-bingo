import { useState } from 'react';
import CompleteFront from './CompleteFront';
import CompleteBack from './CompleteBack';
import Incomplete from './Incomplete';
import { Box } from 'theme-ui';

interface BingoItemProps {
  user: string;
  square: string;
  bookReq: string;
  book: {
    title: string;
    author: string;
  };
}

function BingoItem({ user, square, bookReq, book }: BingoItemProps) {
  const [cardFlipped, setCardFlipped] = useState(false);

  const handleFlip = () => {
    setCardFlipped(!cardFlipped);
  };

  return (
    <Box
      sx={{
        backgroundColor: book ? 'complete' : 'incomplete',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        blockSize: ['98px', '138px'],
        inlineSize: ['auto', '112px'],
        borderRadius: '5px',
        boxShadow: '4px 4px 15px -10px #000000',
        padding: ['0.05rem', '0.1rem'],
      }}
      onClick={handleFlip}
    >
      {book ? (
        cardFlipped ? <CompleteBack user={user} square={square} book={book} /> : <CompleteFront bookReq={bookReq} />
      ) : (
        <Incomplete bookReq={bookReq} square={square} user={user} />
      )}
    </Box>
  );
}

export default BingoItem;

import { Box, Text } from 'theme-ui';
import { Spacer } from '../../../ui';
import BookButtons from '../BookButtons';
import BookInfo from '../../../book/BookInfo';
import Image from 'next/image';
interface ListCompleteProps {
  archived: boolean;
  book: Book;
  cardId: string;
  req: string;
  square: Square;
  usersCard: boolean;
  handleUpdateCardSquare: UpdateSingleSquareFunction;
}

function ListComplete({
  archived,
  book,
  cardId,
  req,
  square,
  usersCard,
  handleUpdateCardSquare,
}: ListCompleteProps) {
  return (
    <>
      {book.cover && (
        <Box sx={{ blockSize: '100%', inlineSize: '140px' }}>
          <Image
            alt={`${book.title} cover image`}
            src={book.cover}
            width={140}
            height={210}
          />
        </Box>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Text as="h3" variant="subheading">
          {req}
        </Text>
        <Spacer size="1rem" />
        <BookInfo book={book} gap="0.4rem" />
        {!archived && usersCard && (
          <>
            <Spacer size="1rem" />
            <BookButtons
              cardId={cardId}
              square={square}
              sx={{
                blockSize: ['18px', '26px'],
                inlineSize: ['124px', '144px'],
              }}
              handleUpdateCardSquare={handleUpdateCardSquare}
            />
          </>
        )}
      </Box>
    </>
  );
}

export default ListComplete;

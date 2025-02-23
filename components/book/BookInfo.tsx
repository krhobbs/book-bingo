import { Text } from 'theme-ui';
import { Spacer } from '../ui';

interface BookInfoProps {
  book: Book;
  gap?: string | string[];
}

function BookInfo({ book, gap = '0px' }: BookInfoProps) {
  return (
    <>
      <Text as="p" variant="body1">
        {book.title}
      </Text>
      <Spacer size={gap} />
      <Text as="p" variant="body2">
        By {book.author}
      </Text>
    </>
  );
}

export default BookInfo;

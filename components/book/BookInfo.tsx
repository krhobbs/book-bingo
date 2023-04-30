import { Flex, Text } from 'theme-ui';

interface BookInfoProps {
    book: Book;
}

function BookInfo({ book }: BookInfoProps) {

    return (
        <Flex sx={{flexDirection: 'column'}}>
            <Text variant='body1'>{book.title}</Text>
            <Text variant='body2'>By {book.author}</Text>
        </Flex>
    )
}

export default BookInfo;
import { Flex, Text } from 'theme-ui';

interface BookInfoProps {
    book: {
        title: string;
        author: string;
    }
}

function BookInfo({ book }: BookInfoProps) {

    return (
        <Flex sx={{flexDirection: 'column'}}>
            <Text variant='body1Light'>{book.title}</Text>
            <Text variant='body2Light'>By {book.author}</Text>
        </Flex>
    )
}

export default BookInfo;
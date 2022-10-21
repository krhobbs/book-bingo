import { Text } from 'theme-ui';

interface ItemFrontProps {
    bookReq: string;
}

function ItemFront({ bookReq }: ItemFrontProps) {
    return (
        <Text variant='body1Light'>
            {bookReq}
        </Text>
    );
}

export default ItemFront;
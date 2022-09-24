import { Text } from 'theme-ui';

interface ItemFrontProps {
    bookReq: string;
}

function ItemFront({ bookReq }: ItemFrontProps) {
    return (
        <Text variant='body1'>
            {bookReq}
        </Text>
    );
}

export default ItemFront;
import BingoItem from './bingo-item';
import Spacer from '../ui/Spacer';
import { Box, Text } from 'theme-ui';

interface BingoSquareProps {
    id: string;
    req: string;
    book?: {
        title: string;
        author: string;
    }
}

function BingoCard(props) {

    return (
        <Box sx={{inlineSize: ['100%', 'min-content'], minInlineSize: '320px', mx: 'auto', px: ['2px', '0']}}>
            <Text variant={'heading2'}>{props.card.user || 'No name'}</Text>
            <Spacer size={['1.25rem', '1.5rem']} />
            <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'repeat(5, auto)', gap: ['0.3rem', '0.5rem']}}>
                {
                    props.card.squares.map((square: BingoSquareProps) => {
                        return (
                            <BingoItem key={square.id} user={props.card.user} square={square.id} bookReq={square.req} book={square.book}/>
                        )
                    })
                }
            </Box>
            <Spacer size={['3rem', '4rem']} />
        </Box>
    );

}

export default BingoCard;
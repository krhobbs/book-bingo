import BingoItem from './bingo-item';
import Spacer from '../ui/Spacer';
import { Box, Text } from 'theme-ui';

function BingoCard(props) {

    return (
        <Box sx={{maxInlineSize: '532px', mx: 'auto'}}>
            <Text variant={'heading2'}>{props.card.user || 'No name'}</Text>
            <Spacer size={['1.25rem', '1.5rem']} />
            <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(5, auto)', gridTemplateRows: 'repeat(5, auto)', gap: '0.5rem'}}>
                {
                    props.card.squares.map((square) => {
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
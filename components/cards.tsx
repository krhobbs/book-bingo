import BingoCard from './bingo-card/bingo-card';
import { Box } from 'theme-ui'

function Cards(props) {

    return (
        <Box sx={{marginTop: '7rem'}}>
            {props.cards.map((card) => {
                return (
                    <BingoCard key={card.user} card={card} />
                );
            })}
        </Box>
    )

}

export default Cards;
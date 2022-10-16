import BingoCard from './bingo-card/bingo-card';
import { Box } from 'theme-ui'
import Spacer from './ui/Spacer';

function Cards(props) {

    return (
        <Box>
            <Spacer size="6.5rem" />
            {props.cards.map((card) => {
                return (
                    <BingoCard key={card.user} card={card} />
                );
            })}
        </Box>
    )

}

export default Cards;
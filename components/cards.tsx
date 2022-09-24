import BingoCard from './bingo-card/bingo-card';
import { Box } from 'theme-ui'

function Cards(props) {

    return (
        <Box sx={{marginTop: '7rem'}}>
            {props.names.map((name) => {
                const cardBooks = props.books.filter((book) => {
                    return book.user === name;
                })
                return (
                    <BingoCard key={name} books={cardBooks} name={name} />
                );
            })}
        </Box>
    )

}

export default Cards;
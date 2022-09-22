import BingoCard from './bingo-card/bingo-card';

function Cards(props) {

    return (
        <div style={{marginBottom: '2rem', marginTop: '6rem'}}>
            {props.names.map((name) => {
                const cardBooks = props.books.filter((book) => {
                    return book.user === name;
                })
                return (
                    <BingoCard key={name} books={cardBooks} name={name} />
                );
            })}
        </div>
    )

}

export default Cards;
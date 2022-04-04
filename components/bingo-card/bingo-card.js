import styles from './bingo-card.module.scss';
import BingoItem from './bingo-item';

function BingoCard(props) {

    return (
        <div>
            <h2 className={styles.bingoCardTitle}>{props.name || 'No name'}</h2>
            <div className={styles.bingoGrid}>
                <BingoItem user={props.name} square="1A" bookReq="LGBTQIA List Book" book={props.books.find((book) => book.square === "1A")}/>
                <BingoItem user={props.name} square="1B" bookReq="Weird Ecology" book={props.books.find((book) => book.square === "1B")}/>
                <BingoItem user={props.name} square="1C" bookReq="Two or More Authors" book={props.books.find((book) => book.square === "1C")}/>
                <BingoItem user={props.name} square="1D" bookReq="Historical SFF" book={props.books.find((book) => book.square === "1D")}/>
                <BingoItem user={props.name} square="1E" bookReq="Set in Space" book={props.books.find((book) => book.square === "1E")}/>
                <BingoItem user={props.name} square="2A" bookReq="Stand alone" book={props.books.find((book) => book.square === "2A")}/>
                <BingoItem user={props.name} square="2B" bookReq="Anti-hero" book={props.books.find((book) => book.square === "2B")}/>
                <BingoItem user={props.name} square="2C" bookReq="Book Club or Readalong Book" book={props.books.find((book) => book.square === "2C")}/>
                <BingoItem user={props.name} square="2D" bookReq="Cool Weapon" book={props.books.find((book) => book.square === "2D")}/>
                <BingoItem user={props.name} square="2E" bookReq="Revolutions and Rebellions" book={props.books.find((book) => book.square === "2E")}/>
                <BingoItem user={props.name} square="3A" bookReq="Name in the Title" book={props.books.find((book) => book.square === "3A")}/>
                <BingoItem user={props.name} square="3B" bookReq="Author uses Initials" book={props.books.find((book) => book.square === "3B")}/>
                <BingoItem user={props.name} square="3C" bookReq="Published in 2022" book={props.books.find((book) => book.square === "3C")}/>
                <BingoItem user={props.name} square="3D" bookReq="Urban Fantasy" book={props.books.find((book) => book.square === "3D")} />
                <BingoItem user={props.name} square="3E" bookReq="Set in Africa" book={props.books.find((book) => book.square === "3E")} />
                <BingoItem user={props.name} square="4A" bookReq="Non-Human Protaganist" book={props.books.find((book) => book.square === "4A")} />
                <BingoItem user={props.name} square="4B" bookReq="Wibbly Wobbly Timey Wimey" book={props.books.find((book) => book.square === "4B")} />
                <BingoItem user={props.name} square="4C" bookReq="Five Short Stories" book={props.books.find((book) => book.square === "4C")} />
                <BingoItem user={props.name} square="4D" bookReq="Mental Health" book={props.books.find((book) => book.square === "4D")} />
                <BingoItem user={props.name} square="4E" bookReq="Self Published" book={props.books.find((book) => book.square === "4E")} />
                <BingoItem user={props.name} square="5A" bookReq="Award Finalist" book={props.books.find((book) => book.square === "5A")} />
                <BingoItem user={props.name} square="5B" bookReq="BIPOC Author" book={props.books.find((book) => book.square === "5B")} />
                <BingoItem user={props.name} square="5C" bookReq="Shape-shifters" book={props.books.find((book) => book.square === "5C")} />
                <BingoItem user={props.name} square="5D" bookReq="No Ifs, Ands, or Buts" book={props.books.find((book) => book.square === "5D")} />
                <BingoItem user={props.name} square="5E" bookReq="Family Matters" book={props.books.find((book) => book.square === "5E")} />
            </div>
        </div>
    )

}

export default BingoCard;
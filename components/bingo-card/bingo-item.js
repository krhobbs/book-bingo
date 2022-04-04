import { useState, useEffect } from "react";
import styles from './bingo-item.module.scss';
import ItemFront from "./item-front";
import ItemBack from "./item-back";

function BingoItem(props) {
    const [cardFlipped, setCardFlipped] = useState(false);

    const handleFlip = () => {
        setCardFlipped(!cardFlipped);
    }

    return (
        <div className={styles.bingoItem} onClick={handleFlip}>
            {cardFlipped ?
                <div className={`${styles.itemBack} ${typeof(props.book) !== 'undefined' ? styles.completed : ''}`}>
                    <ItemBack user={props.user} square={props.square} book={props.book} />
                </div> 
            :
                <div className={`${styles.itemFront} ${typeof(props.book) !== 'undefined' ? styles.completed : ''}`}>
                    <ItemFront bookReq={props.bookReq} />
                </div>
            }
        </div>
    );

}


export default BingoItem;
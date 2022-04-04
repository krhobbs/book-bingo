import { useState } from 'react';
import AddBookForm from '../add-book/add-book-form';
import styles from './book-info.module.scss';

function BookInfo(props) {

    return (
        <div>
            <div className={styles.title}>{props.book.title}</div>
            <div className={styles.author}>By {props.book.author}</div>
        </div>
    )
}

export default BookInfo;
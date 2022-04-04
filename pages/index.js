
import { useEffect, useState } from 'react';
import { MongoClient } from 'mongodb';
import Cards from '../components/cards';
import Head from 'next/head';

export default function Home(props) {
  const [loadedBooks, setLoadedBooks] = useState([])

  useEffect(() => {
    //Request
    setLoadedBooks(props.books);

  }, [])

  return (
    <>
      <Head>
        <title>Book Bingo</title>
      </Head>
      <Cards books={loadedBooks} names={['Kyle', 'Rachel', 'Simon']}/>
    </>
    
    
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect('mongodb+srv://kylehobbs:dumbledore7@cluster0.9evla.mongodb.net/books?retryWrites=true&w=majority');
  const db = client.db();

  const booksCollection = db.collection('books');

  const books = await booksCollection.find().toArray();

  client.close();

  return {
    props: {
      books: books.map(book => ({
        title: book.title,
        author: book.author,
        //image: book.image,
        user: book.user,
        square: book.square,
        id: book._id.toString()
      }))
    },
    revalidate: 1
  };
}



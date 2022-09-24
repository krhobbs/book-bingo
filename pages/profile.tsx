import { useEffect, useState } from 'react';
import { MongoClient } from 'mongodb';
import Cards from '../components/cards';
import Head from 'next/head';

export default function Profile(props) {

  return (
    <>
      <Head>
        <title>Book Bingo | User Profile</title>
      </Head>
      <Cards books={props.books} names={['Kyle']}/>
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




import { useEffect, useState } from 'react';
import Cards from '../components/cards';
import Head from 'next/head';
import { connectDatabase, getDocuments } from '../utils/db-utils';

export default function Home(props) {

  return (
    <>
      <Head>
        <title>Book Bingo</title>
      </Head>
      <Cards cards={props.cards} />
    </>
    
    
  );
}

export async function getStaticProps() {
  const client = await connectDatabase();
  const cards = await getDocuments(client, 'cards');

  client.close();

  return {
    props: {
      cards: cards
    },
    revalidate: 1
  };
}



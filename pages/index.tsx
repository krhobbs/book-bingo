
import { useEffect, useState } from 'react';
import Cards from '../components/cards';
import Head from 'next/head';
import { connectDatabase, getDocuments } from '../utils/db-utils';

export default function Home(props) {
  const [loadedCards, setLoadedCards] = useState([])

  useEffect(() => {
    setLoadedCards(props.cards);
  }, [props.cards])

  return (
    <>
      <Head>
        <title>Book Bingo</title>
      </Head>
      <Cards cards={loadedCards} />
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



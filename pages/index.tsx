
import { useEffect, useState } from 'react';
import { getCards } from '../utils/api-utils';
import Cards from '../components/cards';
import Head from 'next/head';

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

  const cards = await getCards();

  return {
    props: {
      cards: cards
    },
    revalidate: 1
  };
}



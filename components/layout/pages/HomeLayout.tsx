import Head from 'next/head';
import Cards from '../../Cards';

function HomeLayout({ cards } : { cards: Card[] }) {
  return (
    <>
      <Head>
        <title>Book Bingo</title>
      </Head>
      <Cards cards={cards} />
    </>
  );
}

export default HomeLayout;

import Head from 'next/head';
import Cards from '../../Cards';
import GridListSwitch from '../../ui/GridListSwitch';
import Spacer from '../../ui/Spacer';

function HomeLayout({ cards } : { cards: Card[] }) {
  return (
    <>
      <Head>
        <title>Book Bingo</title>
      </Head>
      <GridListSwitch />
      <Spacer size="2rem" />
      <Cards cards={cards} />
    </>
  );
}

export default HomeLayout;

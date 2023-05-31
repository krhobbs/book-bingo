import Head from 'next/head';
import Cards from '../../Cards';
import GridListSwitch from '../../ui/GridListSwitch';
import Spacer from '../../ui/Spacer';
import { Text } from 'theme-ui';

function HomeLayout({ cards } : { cards: Card[] }) {
  return (
    <>
      <Head>
        <title>Book Bingo</title>
      </Head>
      <Text as="h1" variant="heading1" sx={{textAlign: 'center'}}>All Cards</Text>
      <Spacer size="2rem" />
      <GridListSwitch />
      <Spacer size="2rem" />
      <Cards cards={cards} />
    </>
  );
}

export default HomeLayout;

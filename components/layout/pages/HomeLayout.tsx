import Head from 'next/head';
import Cards from '../../Cards';
import GridListSwitch from '../../ui/GridListSwitch';
import Spacer from '../../ui/Spacer';
import { Text } from 'theme-ui';
import useSWR from 'swr';
import { fetchCards } from '../../../utils/api-utils';

function HomeLayout({ cards } : { cards: Card[] }) {
  const { data, mutate } = useSWR(`/api/cards`, fetchCards, { fallbackData: cards });

  return (
    <>
      <Head>
        <title>Book Bingo</title>
      </Head>
      <Text as="h1" variant="heading1" sx={{textAlign: 'center'}}>All Cards</Text>
      <Spacer size="2rem" />
      <GridListSwitch />
      <Spacer size="2rem" />
      <Cards cards={data} mutate={mutate} />
    </>
  );
}

export default HomeLayout;

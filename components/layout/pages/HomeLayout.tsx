import Head from 'next/head';
import Cards from '../../Cards';
import GridListSwitch from '../../ui/GridListSwitch';
import Spacer from '../../ui/Spacer';
import { Text } from 'theme-ui';
import useSWR from 'swr';
import { fetchCards } from '../../../utils/api-utils';
import Pagination from '../../ui/Pagination';
import { useRouter } from 'next/router';

function HomeLayout({ cards, pageCount } : { cards: Card[], pageCount: number }) {
  const router = useRouter();
  const page = parseInt(router.query.page as string) || 1;
  const { data, mutate } = useSWR(`/api/cards?page=${page}`, fetchCards, { fallbackData: cards });

  return (
    <>
      <Head>
        <title>Book Bingo</title>
      </Head>
      <Text as="h1" variant="heading1" sx={{textAlign: 'center'}}>All Cards</Text>
      <Spacer size="2rem" />
      <GridListSwitch />
      <Spacer size="2rem" />
      {cards.length === 0 ? 
        <Text as="p" variant="body1" sx={{textAlign: 'center'}}>No Cards to Display.</Text> 
        : 
        <Cards cards={data} mutate={mutate} />
      }
      <Spacer size="1rem" />
      <Pagination pageCount={pageCount} currentPage={page} />
    </>
  );
}

export default HomeLayout;

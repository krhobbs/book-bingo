import Head from 'next/head';
import { Box, Text } from 'theme-ui';
import Spacer from '../../ui/Spacer';
import Cards from '../../Cards';
import GridListSwitch from '../../ui/GridListSwitch';
import { fetchFriendsCards } from '../../../utils/api-utils';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Pagination from '../../ui/Pagination';

function FriendsLayout({
  cards,
  pageCount,
  username,
}: {
  cards: Card[];
  pageCount: number;
  username: string;
}) {
  const router = useRouter();
  const page = parseInt(router.query.page as string) || 1;
  const { data, mutate } = useSWR(
    `/api/cards/${username}/friends?page=${page}`,
    fetchFriendsCards,
    { fallbackData: cards },
  );
  return (
    <>
      <Head>
        <title>Book Bingo | Friends</title>
      </Head>
      <Text as="h1" variant="heading1" sx={{ textAlign: 'center' }}>
        Friends
      </Text>
      <Spacer size="2rem" />
      <GridListSwitch />
      <Spacer size="2rem" />
      {cards.length === 0 ? (
        <Text as="p" variant="body1" sx={{ textAlign: 'center' }}>
          None of your friends have cards to display.
        </Text>
      ) : (
        <>
          <Cards cards={data} mutate={mutate} />
          {pageCount > 1 && (
            <>
              <Spacer size="1rem" />
              <Pagination pageCount={pageCount} currentPage={page} />
            </>
          )}
        </>
      )}
    </>
  );
}

export default FriendsLayout;

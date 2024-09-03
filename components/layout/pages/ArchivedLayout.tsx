import Head from 'next/head';
import Cards from '../../Cards';
import { Text } from 'theme-ui';
import Spacer from '../../ui/Spacer';
import GridListSwitch from '../../ui/GridListSwitch';
import useSWR from 'swr';
import { fetchUsersCards } from '../../../utils/api-utils';
import { useRouter } from 'next/router';
import Pagination from '../../ui/Pagination';

interface ArchivedLayoutProps {
  cards: Card[];
  pageCount: number;
  username: string;
}

function ArchivedLayout({ cards, pageCount, username }: ArchivedLayoutProps) {
  const router = useRouter();
  const page = parseInt(router.query.page as string) || 1;
  const { data, mutate } = useSWR(
    `/api/cards/${username}/archived?page=${page}`,
    fetchUsersCards,
    { fallbackData: cards },
  );
  return (
    <>
      <Head>
        <title>Book Bingo | Archived</title>
      </Head>
      <Text variant="heading1" as="h1" sx={{ textAlign: 'center' }}>
        Your Archived Cards
      </Text>
      <Spacer size="2rem" />
      <GridListSwitch />
      <Spacer size="2rem" />
      {cards.length === 0 ? (
        <Text as="p" sx={{ textAlign: 'center' }}>
          No Archived Cards.
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

export default ArchivedLayout;

import Head from 'next/head';
import Cards from '../../Cards';
import { Text } from 'theme-ui';
import { useRouter } from 'next/router';
import { GridListSwitch, Pagination, Spacer } from '../../ui';
import useCards from '../../../hooks/useCards';

interface ArchivedLayoutProps {
  cards: Card[];
  pageCount: number;
  userId: string;
}

function ArchivedLayout({ cards: fallbackCards, pageCount, userId }: ArchivedLayoutProps) {
  const router = useRouter();
  const page = parseInt(router.query.page as string) || 1;
  const { cards, updateCardOpt, deleteCardOpt, archiveCardOpt } = useCards({
    filters: {
      userIds: [userId],
      archived: true,
      page
    },
    fallback: {
      cards: fallbackCards,
      pageCount
    }
  });
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
          <Cards cards={cards} updateCardOpt={updateCardOpt} deleteCardOpt={deleteCardOpt} archiveCardOpt={archiveCardOpt} />
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

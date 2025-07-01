import Head from 'next/head';
import { Text } from 'theme-ui';
import { GridListSwitch, Pagination, Spacer } from '../../ui';
import Cards from '../../Cards';
import { useRouter } from 'next/router';
import useCards from '../../../hooks/useCards';

function FriendsLayout({
  cards: fallbackCards,
  pageCount,
  userIds,
}: {
  cards: Card[];
  pageCount: number;
  userIds: string[];
}) {
  const router = useRouter();
  const page = parseInt(router.query.page as string) || 1;
  const { cards, updateCardOpt, deleteCardOpt, archiveCardOpt } = useCards({
    filters: {
      page,
      archived: false,
      userIds
    }, fallback: { cards: fallbackCards, pageCount: pageCount }
  })
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
          <Cards cards={cards} archiveCardOpt={archiveCardOpt} updateCardOpt={updateCardOpt} deleteCardOpt={deleteCardOpt} />
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

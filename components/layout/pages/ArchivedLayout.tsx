import Head from 'next/head';
import Cards from '../../Cards';
import { Text } from 'theme-ui';
import Spacer from '../../ui/Spacer';
import GridListSwitch from '../../ui/GridListSwitch';
import useSWR from 'swr';
import { fetchUsersCards } from '../../../utils/api-utils';

interface ArchivedLayoutProps {
  cards: Card[];
  username: string;
}

function ArchivedLayout({ cards, username }: ArchivedLayoutProps) {
  const { data, mutate } = useSWR(`/api/cards/${username}/archived`, fetchUsersCards, { fallbackData: cards });
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
        <Text as="p" sx={{textAlign: 'center'}}>No Archived Cards.</Text>
      ) : (
        <Cards cards={data} mutate={mutate} />
      )}
    </>
  );
}

export default ArchivedLayout;

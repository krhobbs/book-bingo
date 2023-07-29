import Head from 'next/head';
import { Box, Text } from 'theme-ui';
import Spacer from '../../ui/Spacer';
import Cards from '../../Cards';
import GridListSwitch from '../../ui/GridListSwitch';
import { fetchFriendsCards } from '../../../utils/api-utils';
import useSWR from 'swr';

function FriendsLayout({ cards, username }: { cards: Card[], username: string }) {
  const { data, mutate } = useSWR(`/api/cards/${username}/friends`, fetchFriendsCards, { fallbackData: cards });
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
        <Cards cards={data} mutate={mutate} />
      )}
    </>
  );
}

export default FriendsLayout;

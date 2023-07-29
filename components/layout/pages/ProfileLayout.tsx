import Head from 'next/head';
import { Text } from 'theme-ui';
import Cards from '../../Cards';
import NewCard from '../../NewCard';
import GridListSwitch from '../../ui/GridListSwitch';
import Spacer from '../../ui/Spacer';
import useSWR from 'swr';
import { fetchUsersCards } from '../../../utils/api-utils';

interface ProfileLayoutProps {
  cards: Card[];
  username: string;
}

function ProfileLayout({ cards, username }: ProfileLayoutProps) {
  const { data, mutate } = useSWR(`/api/cards/${username}`, fetchUsersCards, { fallbackData: cards });
  return (
    <>
      <Head>
        <title>Book Bingo | Profile</title>
      </Head>
      <Text variant="heading1" as="h1" sx={{ textAlign: 'center' }}>
        Your Profile
      </Text>
      <Spacer size="2rem" />
      <GridListSwitch />
      <Spacer size="2rem" />
      {cards.length >= 1 ? (
        <>
          <Cards cards={data} mutate={mutate} />
          <Spacer size="2rem" />
          <NewCard mutate={mutate} />
        </>
      ) : (
        <NewCard mutate={mutate} />
      )}
    </>
  );
}

export default ProfileLayout;

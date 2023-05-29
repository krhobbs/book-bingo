import Head from 'next/head';
import { Text } from 'theme-ui';
import Cards from '../../Cards';
import NewCard from '../../NewCard';
import GridListSwitch from '../../ui/GridListSwitch';
import Spacer from '../../ui/Spacer';

interface ProfileLayoutProps {
  cards: Card[];
  username: string;
}

function ProfileLayout({ cards, username }: ProfileLayoutProps) {
  return (
    <>
      <Head>
        <title>Book Bingo | Profile</title>
      </Head>
      <GridListSwitch />
      <Spacer size="2rem" />
      <Text variant="heading1" as="h1" sx={{ textAlign: 'center' }}>
        {username}&apos;s Profile
      </Text>
      <Spacer size="2rem" />
      {cards.length >= 1 ? (
        <>
          <Cards cards={cards} />
          <Spacer size="2rem" />
          <NewCard />
        </>
      ) : (
        <NewCard />
      )}
    </>
  );
}

export default ProfileLayout;

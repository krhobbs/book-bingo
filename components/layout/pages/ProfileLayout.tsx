import Head from 'next/head';
import { Text } from 'theme-ui';
import Cards, { Card } from '../../Cards';
import NewCard from '../../NewCard';
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
      <Text variant="heading1" as="h1" sx={{ textAlign: 'center' }}>
        {username}'s Profile
      </Text>
      {cards.length >= 1 ? (
        <>
          <Cards cards={cards} />
          <Spacer size="3.5rem" />
          <NewCard />
        </>
      ) : (
        <NewCard />
      )}
    </>
  );
}

export default ProfileLayout;

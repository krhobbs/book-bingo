import Head from 'next/head';
import Cards, { Card } from '../../Cards';
import { Text } from 'theme-ui';
import Spacer from '../../ui/Spacer';

interface ArchivedLayoutProps {
  cards: Card[];
  username: string;
}

function ArchivedLayout({ cards, username }: ArchivedLayoutProps) {
  return (
    <>
      <Head>
        <title>Book Bingo | Archived</title>
      </Head>
      <Text variant="heading1" as="h1" sx={{ textAlign: 'center' }}>
        {username}'s Archived Cards
      </Text>
      <Spacer size="2rem" />
      {cards.length === 0 ? (
        <Text>No Archived Cards.</Text>
      ) : (
        <Cards cards={cards} />
      )}
    </>
  );
}

export default ArchivedLayout;
import Head from 'next/head';
import Cards from '../../Cards';
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
        {username}&apos;s Archived Cards
      </Text>
      <Spacer size="2rem" />
      {cards.length === 0 ? (
        <Text as="p" sx={{textAlign: 'center'}}>No Archived Cards.</Text>
      ) : (
        <Cards cards={cards} />
      )}
    </>
  );
}

export default ArchivedLayout;

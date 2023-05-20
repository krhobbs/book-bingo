import Head from 'next/head';
import { Box, Text } from 'theme-ui';
import Spacer from '../../ui/Spacer';
import Cards from '../../Cards';
import GridListSwitch from '../../ui/GridListSwitch';

function FriendsLayout({ cards }: { cards: Card[] }) {
  return (
    <>
      <Head>
        <title>Book Bingo | Friends</title>
      </Head>
      <GridListSwitch />
      <Spacer size="2rem" />
      {cards.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Spacer size="9rem" />
          <Text>No friends.</Text>
        </Box>
      ) : (
        <Cards cards={cards} />
      )}
    </>
  );
}

export default FriendsLayout;

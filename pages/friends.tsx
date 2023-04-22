import { connectDatabase, getDocumentsByUsername } from '../utils/db-utils';
import { getSession } from 'next-auth/react';
import Spacer from '../components/ui/Spacer';
import { Box, Text } from 'theme-ui';
import Head from 'next/head';
import Cards from '../components/cards';

export default function Friends(props) {
  if (props.cards.length === 0) {
    return (
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Spacer size="9rem" />
        <Text>No friends.</Text>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>Book Bingo | Friends</title>
      </Head>
      <Cards cards={props.cards} />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const client = await connectDatabase();
    const cards = await getDocumentsByUsername(
      client,
      'cards',
      session.user.friends,
      { archived: false }
    );

    client.close();

    return {
      props: {
        session: session,
        cards: cards,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

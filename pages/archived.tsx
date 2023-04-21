import { connectDatabase, getDocuments } from '../utils/db-utils';
import { getSession } from 'next-auth/react';
import Spacer from '../components/ui/Spacer';
import Cards from '../components/cards';
import Head from 'next/head';
import { Text } from 'theme-ui';

export default function Archived(props) {
  return (
    <>
      <Head>
        <title>Book Bingo | Archived Cards</title>
      </Head>
      <Spacer size="3.5rem" />
      {props.cards.length >= 1 ? (
          <Cards cards={props.cards} />
      ) : (
        <Text>No Archived Cards.</Text>
      )}
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
    const cards = await getDocuments(client, 'cards', { archived: true, user: session.user.username });

    client.close();

    return {
      props: {
        cards: cards,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

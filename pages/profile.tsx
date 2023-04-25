import { connectDatabase, getDocuments } from '../utils/db-utils';
import { getSession } from 'next-auth/react';
import Spacer from '../components/ui/Spacer';
import Cards from '../components/cards';
import NewCard from '../components/NewCard';
import Head from 'next/head';

export default function Profile(props) {
  return (
    <>
      <Head>
        <title>Book Bingo | User Profile</title>
      </Head>
      <Spacer size="3.5rem" />
      {props.cards.length >= 1 ? (
        <>
          <Cards cards={props.cards} />
          <Spacer size="3.5rem" />
          <NewCard />
        </>
      ) : (
        <NewCard />
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
    const cards = await getDocuments(client, 'cards', { archived: false, user: session.user.username });

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

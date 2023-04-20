import { connectDatabase, getDocumentById } from '../utils/db-utils';
import { getSession } from 'next-auth/react';
import Spacer from '../components/ui/Spacer';
import BingoCard from '../components/bingo-card/BingoCard';
import NewCard from '../components/NewCard';
import Head from 'next/head';

export default function Profile(props) {
  return (
    <>
      <Head>
        <title>Book Bingo | User Profile</title>
      </Head>
      <Spacer size="6.5rem" />
      {props.card ? (
        <>
          <BingoCard card={props.card} />
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
    const card = await getDocumentById(client, 'cards', session.user.cards[0]);

    client.close();

    return {
      props: {
        card: card,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

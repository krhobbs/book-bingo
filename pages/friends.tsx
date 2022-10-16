import { connectDatabase, getDocumentsByUsername } from '../utils/db-utils';
import { getSession } from 'next-auth/react';
import Spacer from '../components/ui/Spacer';
import Cards from '../components/cards';
import Head from 'next/head';

export default function Friends(props) {
//   console.log('PROPS');
//   console.log(props);

//   console.log('Client Side');
//   console.log(props.session);

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
        permanent: false
      }
    }
  }

  const client = await connectDatabase();
  const cards = await getDocumentsByUsername(client, 'cards', session.user.friends);

  client.close();

  return {
    props: {
      session: session,
      cards: cards
    }
  };
}



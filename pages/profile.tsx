import { connectDatabase, getDocumentById, getDocumentByUsername } from '../utils/db-utils';
import { getSession } from 'next-auth/react';
import Spacer from '../components/ui/Spacer';
import BingoCard from '../components/bingo-card/bingo-card';
import Head from 'next/head';
import { useEffect } from 'react';

export default function Profile(props) {
  const user = props.user;
  const card = props.card;

  if (!user || !card) {
    return <p>Loading...</p>
  }

  console.log('Client Side');
  console.log(props.session);

  return (
    <>
      <Head>
        <title>Book Bingo | User Profile</title>
      </Head>
      <Spacer size='6.5rem' />
      <p>Username {props.user.username}</p>
      <p>Password {props.user.password}</p>
      <p>Friends {props.user.friends.toString()}</p>
      <BingoCard card={props.card} />
    </>
  );
}

export async function getServerSideProps(context) {
  const client = await connectDatabase();
  const user = await getDocumentByUsername(client, 'users', '***REMOVED***');
  const cardId = user.card;
  const card = await getDocumentById(client, 'cards', cardId);


  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {
      session: session,
      user: user,
      card: card
    }
  };
}



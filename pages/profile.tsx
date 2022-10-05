import { getUser, getCard } from '../utils/api-utils';
import { connectDatabase, getDocumentById, getDocumentByUsername } from '../utils/db-utils';
import Spacer from '../components/ui/Spacer';
import BingoCard from '../components/bingo-card/bingo-card';
import Head from 'next/head';

export default function Profile(props) {
  const user = props.user;
  const card = props.card;

  if (!user || !card) {
    return <p>Loading...</p>
  }

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

export async function getStaticProps() {
  const client = await connectDatabase();
  const user = await getDocumentByUsername(client, 'users', 'kylehobbs');
  const cardId = user.card;
  const card = await getDocumentById(client, 'cards', cardId);

  return {
    props: {
      user: user,
      card: card
    },
    revalidate: 1
  };
}



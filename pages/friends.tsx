import { connectDatabase, getDocumentsByUsername } from '../utils/db-utils';
import { getSession } from 'next-auth/react';
import FriendsLayout from '../components/layout/pages/FriendsLayout';

export default function Friends({ cards } : { cards: Card[] }) {
  return <FriendsLayout cards={cards} />;
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
        cards: cards,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

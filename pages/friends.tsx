import { getCardsOfUsers } from '../utils/db-utils';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import FriendsLayout from '../components/layout/pages/FriendsLayout';

export default function Friends({
  cards,
  username,
}: {
  cards: Card[];
  username: string;
}) {
  return <FriendsLayout cards={cards} username={username} />;
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const cards = await getCardsOfUsers(session.user.friends);

    return {
      props: {
        cards: cards,
        username: session.user.username,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

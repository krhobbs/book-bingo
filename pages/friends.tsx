import { getCardsOfUsers } from '../utils/db-utils';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import FriendsLayout from '../components/layout/pages/FriendsLayout';

export default function Friends({
  cards,
  pageCount,
  username,
}: {
  cards: Card[];
  pageCount: number;
  username: string;
}) {
  return (
    <FriendsLayout cards={cards} pageCount={pageCount} username={username} />
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  try {
    const [cards, pageCount] = await getCardsOfUsers(session.user.friends);

    return {
      props: {
        cards,
        pageCount,
        username: session.user.username,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

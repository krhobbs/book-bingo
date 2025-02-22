import { getCardsOfUser } from '../utils/db-utils';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import ProfileLayout from '../components/layout/pages/ProfileLayout';

export default function Profile({
  cards,
  pageCount,
  username,
  user_id
}: {
  cards: Card[];
  pageCount: number;
  username: string;
  user_id: string;
}) {
  return (
    <ProfileLayout cards={cards} pageCount={pageCount} username={username} userId={user_id} />
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
    const [cards, pageCount] = await getCardsOfUser(session.user.id);

    return {
      props: {
        cards,
        pageCount,
        username: session.user.username,
        user_id: session.user.id
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

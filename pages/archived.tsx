import { getCardsOfUser } from '../utils/db-utils';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import ArchivedLayout from '../components/layout/pages/ArchivedLayout';

export default function Archived({
  cards,
  pageCount,
  username,
}: {
  cards: Card[];
  pageCount: number;
  username: string;
}) {
  return <ArchivedLayout cards={cards} pageCount={pageCount} username={username} />;
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
    const [cards, pageCount] = await getCardsOfUser(session.user.username, true);

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

import { getCardsOfUser } from '../utils/db-utils';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import ArchivedLayout from '../components/layout/pages/ArchivedLayout';

export default function Archived({
  cards,
  pageCount,
  user_id
}: {
  cards: Card[];
  pageCount: number;
  user_id: string
}) {
  return (
    <ArchivedLayout cards={cards} pageCount={pageCount} userId={user_id} />
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
    const [cards, pageCount] = await getCardsOfUser(
      session.user.id,
      true,
    );

    return {
      props: {
        cards,
        pageCount,
        user_id: session.user.id,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

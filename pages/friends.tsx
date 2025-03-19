import { getCards } from '../utils/db-utils';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import FriendsLayout from '../components/layout/pages/FriendsLayout';
import { GetServerSidePropsContext } from 'next';

export default function Friends({
  cards,
  pageCount,
  userIds,
}: {
  cards: Card[];
  pageCount: number;
  userIds: string[];
}) {
  return (
    <FriendsLayout cards={cards} pageCount={pageCount} userIds={userIds} />
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
    const { cards, pageCount } = await getCards({ userIds: session.user.friends, archived: false, page: 1 });

    return {
      props: {
        cards,
        pageCount,
        userIds: session.user.friends,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

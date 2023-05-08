import { connectDatabase, getCards } from '../utils/db-utils';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import ProfileLayout from '../components/layout/pages/ProfileLayout';

export default function Profile({
  cards,
  username,
}: {
  cards: Card[];
  username: string;
}) {
  return <ProfileLayout cards={cards} username={username} />;
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
    const client = await connectDatabase();
    const cards = await getCards(client, {
      archived: false,
      user: session.user.username,
    });

    client.close();

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

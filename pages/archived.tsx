import { connectDatabase, getDocuments } from '../utils/db-utils';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import ArchivedLayout from '../components/layout/pages/ArchivedLayout';

export default function Archived({
  cards,
  username,
}: {
  cards: Card[];
  username: string;
}) {
  return <ArchivedLayout cards={cards} username={username} />;
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
    const cards = await getDocuments(client, 'cards', {
      archived: true,
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

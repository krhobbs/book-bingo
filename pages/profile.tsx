import { connectDatabase, getDocuments } from '../utils/db-utils';
import { getSession } from 'next-auth/react';
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
    const cards = await getDocuments(client, 'cards', {
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

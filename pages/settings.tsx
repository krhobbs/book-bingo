import Settings from '../components/settings/Settings';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { getFriendsOfUser } from '../utils/db-utils';
import { GetServerSidePropsContext } from 'next';

export default function SettingsPage({ username, friends }: { username: string, friends: string[] }) {
  return <Settings username={username} friends={friends} />;
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
    const friends = await getFriendsOfUser(session.user.id);
    return {
      props: {
        username: session.user.username,
        friends: friends
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

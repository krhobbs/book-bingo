import Settings from '../components/settings/Settings';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { getFriendsOfUser } from '../utils/db-utils';
import { GetServerSidePropsContext } from 'next';

export interface Friend {
  username: string;
  id: string;
}

export default function SettingsPage({ username, userID, friends }: { username: string, userID: string, friends: Friend[] }) {
  return <Settings username={username} userID={userID} friends={friends} />;
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
        userID: session.user.id,
        friends: friends
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

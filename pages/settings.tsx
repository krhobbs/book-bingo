import Settings from '../components/settings/Settings';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { GetServerSidePropsContext } from 'next';

export default function SettingsPage({ username, userID }: { username: string, userID: string }) {
  return <Settings username={username} userID={userID} />;
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
    return {
      props: {
        username: session.user.username,
        userID: session.user.id,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

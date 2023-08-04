import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import CreateTemplateLayout from '../components/layout/pages/CreateTemplateLayout';

function CreateTemplate({
  username,
}: {
  username: string;
}) {
  return <CreateTemplateLayout />;
}

export default CreateTemplate;

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

  return {
    props: {
      username: session.user.username,
    },
  };
}

import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import AddBookLayout from '../components/layout/pages/AddBookLayout';

function AddBook({
  square,
  cardId,
  username,
}: {
  square: string;
  cardId: string;
  username: string;
}) {
  return <AddBookLayout cardId={cardId} username={username} square={square} />;
}

export default AddBook;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || !context.query.square) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      square: context.query.square,
      cardId: context.query.card,
      username: session.user.username,
    },
  };
}

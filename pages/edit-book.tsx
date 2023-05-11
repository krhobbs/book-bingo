import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import EditBookLayout from '../components/layout/pages/EditBookLayout';
import { connectDatabase, getSquare } from '../utils/db-utils';

function EditBook({
  square,
  cardId,
  username,
}: {
  square: Square;
  cardId: string;
  username: string;
}) {
  return <EditBookLayout cardId={cardId} username={username} square={square} />;
}

export default EditBook;

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

  if (!context.query.square || !context.query.card) {
    return { notFound: true };
  }

  try {
    const client = await connectDatabase();
    const square = await getSquare(
      client,
      context.query.card,
      context.query.square
    );
    return {
      props: {
        square: square,
        cardId: context.query.card,
        username: session.user.username,
      },
    };
  } catch (error) {
    console.log(error.message);
    return { notFound: true };
  }
}

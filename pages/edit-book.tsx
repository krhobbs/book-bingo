import EditBookLayout from '../components/layout/pages/EditBookLayout';
import { connectDatabase, getSquare } from '../utils/db-utils';

function EditBook({ square, cardId }: { square: Square; cardId: string }) {
  return <EditBookLayout cardId={cardId} square={square} />;
}

export default EditBook;

export async function getServerSideProps(context) {
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
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}

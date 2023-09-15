import EditBookLayout from '../components/layout/pages/EditBookLayout';
import { connectDatabase, getSquare } from '../utils/db-utils';

function EditBook({ square, cardId, fromPage }: { square: Square; cardId: string; fromPage: string }) {
  return <EditBookLayout cardId={cardId} square={square} fromPage={fromPage}  />;
}

export default EditBook;

export async function getServerSideProps(context) {
  if (!context.query.square || !context.query.card || !context.query.fromPage) {
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
        fromPage: context.query.fromPage
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}

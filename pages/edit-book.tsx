import EditBookLayout from '../components/layout/pages/EditBookLayout';
import { getSquareOfCard } from '../utils/db-utils';

function EditBook({
  square,
  cardId,
  fromPage,
  fromPageNum,
}: {
  square: Square;
  cardId: string;
  fromPage: string;
  fromPageNum: string;
}) {
  return (
    <EditBookLayout
      cardId={cardId}
      square={square}
      fromPage={fromPage}
      fromPageNum={fromPageNum}
    />
  );
}

export default EditBook;

export async function getServerSideProps(context) {
  if (!context.query.square || !context.query.card || !context.query.fromPage) {
    return { notFound: true };
  }

  try {
    const square = await getSquareOfCard(
      context.query.card,
      parseInt(context.query.square),
    );
    return {
      props: {
        square: square,
        cardId: context.query.card,
        fromPage: context.query.fromPage,
        fromPageNum: context.query?.fromPageNum || '1',
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}

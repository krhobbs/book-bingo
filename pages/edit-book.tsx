import { GetServerSidePropsContext } from 'next';
import EditBookLayout from '../components/layout/pages/EditBookLayout';
import { getSquareOfCard } from '../utils/db-utils';
import { paramToNumber, paramToString } from '../utils/param-utils';

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!context.query.square || !context.query.card || !context.query.fromPage) {
    return { notFound: true };
  }

  try {
    const card = paramToString(context.query.card) || '';
    const squareId = paramToNumber(context.query.square) || 1;
    const square = await getSquareOfCard(
      card,
      squareId,
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

import { GetServerSidePropsContext } from 'next';
import EditBookLayout from '../components/layout/pages/EditBookLayout';
import { getSquareOfCard } from '../utils/db-utils';
import { paramToNumber, paramToString } from '../utils/param-utils';

function EditBook({
  square,
  cardId,
  fromPageNum,
}: {
  square: Square;
  cardId: string;
  fromPageNum: string;
}) {
  return (
    <EditBookLayout
      cardId={cardId}
      square={square}
      fromPageNum={fromPageNum}
    />
  );
}

export default EditBook;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!context.query.square || !context.query.card) {
    return { notFound: true };
  }

  try {
    const card = paramToString(context.query.card) ?? '';
    const squareId = paramToNumber(context.query.square) ?? 1;
    const square = await getSquareOfCard(
      card,
      squareId,
    );
    return {
      props: {
        square: square,
        cardId: context.query.card,
        fromPageNum: context.query?.fromPageNum ?? '1',
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}

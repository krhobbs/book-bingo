import { GetServerSidePropsContext } from 'next';
import AddBookLayout from '../components/layout/pages/AddBookLayout';

function AddBook({
  square,
  cardId,
  fromPageNum,
}: {
  square: string;
  cardId: string;
  fromPage: string;
  fromPageNum: string;
}) {
  return (
    <AddBookLayout
      cardId={cardId}
      square={square}
      fromPageNum={fromPageNum}
    />
  );
}

export default AddBook;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!context.query.square || !context.query.card) {
    return { notFound: true };
  }

  return {
    props: {
      square: context.query.square,
      cardId: context.query.card,
      fromPageNum: context.query?.fromPageNum || '1',
    },
  };
}

import { GetServerSidePropsContext } from 'next';
import AddBookLayout from '../components/layout/pages/AddBookLayout';

function AddBook({
  square,
  cardId,
  fromPage,
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
      fromPage={fromPage}
      fromPageNum={fromPageNum}
    />
  );
}

export default AddBook;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!context.query.square || !context.query.card || !context.query.fromPage) {
    return { notFound: true };
  }

  return {
    props: {
      square: context.query.square,
      cardId: context.query.card,
      fromPage: context.query.fromPage,
      fromPageNum: context.query?.fromPageNum || '1',
    },
  };
}

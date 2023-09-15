import AddBookLayout from '../components/layout/pages/AddBookLayout';

function AddBook({ square, cardId, fromPage }: { square: string; cardId: string, fromPage: string }) {
  return <AddBookLayout cardId={cardId} square={square} fromPage={fromPage} />;
}

export default AddBook;

export async function getServerSideProps(context) {
  if (!context.query.square || !context.query.card || !context.query.fromPage) {
    return { notFound: true };
  }
  
  return {
    props: {
      square: context.query.square,
      cardId: context.query.card,
      fromPage: context.query.fromPage
    },
  };
}

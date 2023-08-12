import AddBookLayout from '../components/layout/pages/AddBookLayout';

function AddBook({ square, cardId }: { square: string; cardId: string }) {
  return <AddBookLayout cardId={cardId} square={square} />;
}

export default AddBook;

export async function getStaticProps(context) {
  return {
    props: {
      square: context.query.square,
      cardId: context.query.card,
    },
  };
}

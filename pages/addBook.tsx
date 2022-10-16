import { useRouter } from 'next/router';
import AddBookForm from '../components/add-book/add-book-form';

function NewBookPage(props) {
  const router = useRouter();

  async function addBookHandler(enteredBookData) {
    const response = await fetch('/api/new-book', {
      method: 'POST',
      body: JSON.stringify(enteredBookData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    router.push('/');
  }

  return (
    <AddBookForm
      user={props.user}
      square={props.square}
      onAddBook={addBookHandler}
    />
  );
}

export default NewBookPage;

export async function getServerSideProps(context) {
  if (!context.query.user || !context.query.square) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: context.query.user,
      square: context.query.square,
    },
  };
}

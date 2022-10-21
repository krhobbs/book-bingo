import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import AddBookForm from '../components/add-book/add-book-form';

function AddBook({session, square}) {
  const router = useRouter();

  async function addBookHandler(enteredBookData) {
    const response = await fetch('/api/add-book', {
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
      user={session.user.username}
      square={square}
      onAddBook={addBookHandler}
    />
  );
}

export default AddBook;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || !context.query.square) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: session,
      square: context.query.square,
    },
  };
}

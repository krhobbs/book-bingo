import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import AddBookForm from '../components/add-book/add-book-form';
import Head from 'next/head';

function AddBook({ session, square, card }) {
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

    if (response.ok) {
      router.push('/');
      return 'success';
    } else {
      return data.message;
    }
  }

  return (
    <>
      <Head>
        <title>Book Bingo | Add Book</title>
      </Head>
      <AddBookForm
        card={card}
        user={session.user.username}
        square={square}
        onAddBook={addBookHandler}
      />
    </>
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
      card: context.query.card,
    },
  };
}

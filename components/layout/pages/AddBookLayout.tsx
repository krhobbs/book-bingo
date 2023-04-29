import Head from 'next/head';
import { useRouter } from 'next/router';
import AddBookForm from '../../add-book/AddBookForm';

interface AddBookLayoutProps {
  cardId: string;
  username: string;
  square: string;
}

function AddBookLayout({ cardId, username, square }: AddBookLayoutProps) {
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
        <title>Book Bingo | Add New Book</title>
      </Head>
      <AddBookForm
        card={cardId}
        user={username}
        square={square}
        onAddBook={addBookHandler}
      />
    </>
  );
}

export default AddBookLayout;

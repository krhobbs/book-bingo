import Head from 'next/head';
import { useRouter } from 'next/router';
import AddBookForm from '../../forms/AddBookForm';

interface AddBookLayoutProps {
  cardId: string;
  username: string;
  square: string;
}

function AddBookLayout({ cardId, square }: AddBookLayoutProps) {
  const router = useRouter();

  async function addBookHandler(enteredBookData) {
    const response = await fetch(`/api/card/${cardId}/add-book`, {
      method: 'POST',
      body: JSON.stringify(enteredBookData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      router.back();
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
        square={square}
        onAddBook={addBookHandler}
      />
    </>
  );
}

export default AddBookLayout;

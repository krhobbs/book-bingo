import Head from 'next/head';
import { useRouter } from 'next/router';
import AddBookForm from '../../forms/AddBookForm';
import { useSWRConfig } from 'swr';
import { useSession } from 'next-auth/react';

interface AddBookLayoutProps {
  cardId: string;
  username: string;
  square: string;
}

function AddBookLayout({ cardId, square }: AddBookLayoutProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();

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
      mutate('/api/cards');
      mutate(`/api/cards/${session.user.username}/friends`);
      mutate(`/api/cards/${session.user.username}`);
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

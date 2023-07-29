import Head from 'next/head';
import { useRouter } from 'next/router';
import EditBookForm from '../../forms/EditBookForm';

interface EditBookLayoutProps {
  cardId: string;
  square: Square;
}

function EditBookLayout({ cardId, square }: EditBookLayoutProps) {
  const router = useRouter();

  async function editBookHandler(enteredBookData) {
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
        <title>Book Bingo | Edit Book</title>
      </Head>
      <EditBookForm
        card={cardId}
        square={square}
        onEditBook={editBookHandler}
      />
    </>
  );
}

export default EditBookLayout;

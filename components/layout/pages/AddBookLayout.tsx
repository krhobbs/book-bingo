import Head from 'next/head';
import { useRouter } from 'next/router';
import AddBookForm from '../../forms/AddBookForm';
import { useSWRConfig } from 'swr';
import { useSession } from 'next-auth/react';

interface AddBookLayoutProps {
  cardId: string;
  square: string;
  fromPage: string;
}

function AddBookLayout({ cardId, square, fromPage }: AddBookLayoutProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { mutate, cache } = useSWRConfig();

  async function handleAddBook(book: Book, color: string) {
    const key = fromPage === 'profile' ? `/api/cards/${session.user.username}` : '/api/cards';
    const { data: cards } = cache.get(key);
    const activeCard: Card = cards.filter((c: Card) => c._id === cardId)[0];
    const otherCards: Card[] = cards.filter((c: Card) => c._id !== cardId);

    activeCard.squares[parseInt(square)] = {
      ...activeCard.squares[parseInt(square)],
      color: color,
      book: book,
    }

    const response = await fetch(`/api/card/${cardId}/add-book`, {
      method: 'POST',
      body: JSON.stringify({
        ...activeCard.squares[parseInt(square)]
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      mutate(key, [...otherCards, activeCard]);
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
        handleAddBook={handleAddBook}
      />
    </>
  );
}

export default AddBookLayout;

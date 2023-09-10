import Head from 'next/head';
import { useRouter } from 'next/router';
import EditBookForm from '../../forms/EditBookForm';
import { useSession } from 'next-auth/react';
import { useSWRConfig } from 'swr';

interface EditBookLayoutProps {
  cardId: string;
  square: Square;
  fromPage: string;
}

function EditBookLayout({ cardId, square, fromPage }: EditBookLayoutProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { mutate, cache } = useSWRConfig();

  async function handleEditBook(book: Book, color: string) {
    const key = fromPage === 'profile' ? `/api/cards/${session.user.username}` : '/api/cards';
    const { data: cards } = cache.get(key);
    const activeCard: Card = cards.filter((c: Card) => c._id === cardId)[0];
    const otherCards: Card[] = cards.filter((c: Card) => c._id !== cardId);

    activeCard.squares[parseInt(square.id)] = {
      ...activeCard.squares[parseInt(square.id)],
      color: color,
      book: book,
    } 

    const response = await fetch(`/api/card/${cardId}/add-book`, {
      method: 'POST',
      body: JSON.stringify({
        ...activeCard.squares[parseInt(square.id)]
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
        <title>Book Bingo | Edit Book</title>
      </Head>
      <EditBookForm
        square={square}
        handleEditBook={handleEditBook}
      />
    </>
  );
}

export default EditBookLayout;

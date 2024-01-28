import Head from 'next/head';
import { useRouter } from 'next/router';
import AddBookForm from '../../forms/AddBookForm';
import { useSWRConfig } from 'swr';
import { useSession } from 'next-auth/react';
import { updateCardSquare } from '../../../utils/api-utils';

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

    try {
      const [ activeCard, otherCards ] = await updateCardSquare(book, color, cards, square, cardId);
      await mutate(key, [...otherCards, activeCard]);
      router.back();
    } catch (e) {
      console.error('Error Adding Book!')
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

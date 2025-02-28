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
  fromPageNum: string;
}

function AddBookLayout({
  cardId,
  square,
  fromPage,
  fromPageNum,
}: AddBookLayoutProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { mutate, cache } = useSWRConfig();

  async function handleAddBook(book: Book, color: string) {
    if (!session) { return; }
    const key =
      fromPage === 'profile'
        ? `/api/cards/${session.user.id}?page=${fromPageNum}`
        : `/api/cards?page=${fromPageNum}`;
    const { data: cards } = cache.get(key) as { data: Card[] };

    try {
      const [activeCard, otherCards] = await updateCardSquare(
        cards,
        square,
        cardId,
        book,
        color,
      );
      await mutate(key, [...otherCards, activeCard]);
      router.back();
    } catch (e) {
      console.error('Error Adding Book!');
    }
  }

  return (
    <>
      <Head>
        <title>Book Bingo | Add New Book</title>
      </Head>
      <AddBookForm handleAddBook={handleAddBook} />
    </>
  );
}

export default AddBookLayout;

import Head from 'next/head';
import { useRouter } from 'next/router';
import EditBookForm from '../../forms/EditBookForm';
import { useSession } from 'next-auth/react';
import { useSWRConfig } from 'swr';
import { updateCardSquare } from '../../../utils/api-utils';

interface EditBookLayoutProps {
  cardId: string;
  square: Square;
  fromPage: string;
  fromPageNum: string;
}

function EditBookLayout({
  cardId,
  square,
  fromPage,
  fromPageNum,
}: EditBookLayoutProps) {
  const router = useRouter();
  const { data: session } = useSession({ required: true });
  const { mutate, cache } = useSWRConfig();

  async function handleEditBook(book: Book, color: string) {
    const key =
      fromPage === 'profile'
        ? `/api/cards/${session?.user.id}?page=${fromPageNum}`
        : `/api/cards?page=${fromPageNum}`;
    const { data: cards } = cache.get(key) as { data: Card[] };;

    const [activeCard, otherCards] = await updateCardSquare(
      cards,
      square.id,
      cardId,
      book,
      color,
    );
    await mutate(key, [...otherCards, activeCard]);
    router.back();
  }

  return (
    <>
      <Head>
        <title>Book Bingo | Edit Book</title>
      </Head>
      <EditBookForm square={square} handleEditBook={handleEditBook} />
    </>
  );
}

export default EditBookLayout;

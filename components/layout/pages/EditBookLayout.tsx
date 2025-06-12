import Head from 'next/head';
import { useRouter } from 'next/router';
import EditBookForm from '../../forms/EditBookForm';
import { useSession } from 'next-auth/react';
import useCards from '../../../hooks/useCards';

interface EditBookLayoutProps {
  cardId: string;
  square: Square;
  fromPageNum: string;
}

function EditBookLayout({
  cardId,
  square,
  fromPageNum,
}: EditBookLayoutProps) {
  const router = useRouter();
  const { data: session } = useSession({ required: true });
  const { updateCardOpt } = useCards({ filters: { page: parseInt(fromPageNum), archived: false, userIds: [session?.user.id ?? ''] } })

  async function handleEditBook(book: Book, color: string) {
    if (!session) { return; }

    const newSquare = {
      ...square,
      book: book,
      color: color
    };

    await updateCardOpt({ cardID: cardId, square: newSquare })
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

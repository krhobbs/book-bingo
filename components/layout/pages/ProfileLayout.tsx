import Head from 'next/head';
import { Text } from 'theme-ui';
import Cards from '../../Cards';
import NewCard from '../../NewCard';
import { GridListSwitch, Pagination, Spacer } from '../../ui';
import { addCard } from '../../../utils/api-utils';
import { useRouter } from 'next/router';
import useCards from '../../../hooks/useCards';

interface ProfileLayoutProps {
  cards: Card[];
  pageCount: number;
  username: string;
  userId: string;
}

function ProfileLayout({ cards: fallbackCards, pageCount, username, userId }: ProfileLayoutProps) {
  const router = useRouter();
  const page = parseInt(router.query.page as string) || 1;
  const { cards, mutate } = useCards({
    filters: {
      page,
      archived: false,
      userIds: [userId]
    }, fallback: { cards: fallbackCards, pageCount: pageCount }
  })

  // New Card Creation
  // Take in template data
  const handleNewCard = async (template: Template, closeModal: Function) => {
    try {
      const card = await addCard(username, userId, template);
      const newPageCount = Math.ceil((cards.length + 1) / 10);
      mutate({ cards: [...cards, card], pageCount: newPageCount });
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Book Bingo | Profile</title>
      </Head>
      <Text variant="heading1" as="h1" sx={{ textAlign: 'center' }}>
        Your Profile
      </Text>
      <Spacer size="2rem" />
      <GridListSwitch />
      <Spacer size="2rem" />
      {cards.length >= 1 ? (
        <>
          <Cards cards={cards} mutate={mutate} />
          {pageCount > 1 && (
            <>
              <Spacer size="1rem" />
              <Pagination pageCount={pageCount} currentPage={page} />
            </>
          )}
        </>
      ) : (
        <NewCard handleNewCard={handleNewCard} />
      )}
    </>
  );
}

export default ProfileLayout;

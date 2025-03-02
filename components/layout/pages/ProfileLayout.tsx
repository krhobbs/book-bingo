import Head from 'next/head';
import { Text } from 'theme-ui';
import Cards from '../../Cards';
import NewCard from '../../NewCard';
import { GridListSwitch, Pagination, Spacer } from '../../ui';
import { addCard } from '../../../utils/api-utils';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
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
  const { data: session } = useSession();

  // New Card Creation
  // Take in template data
  const handleNewCard = async (template: Template, closeModal: Function) => {
    try {
      const card = await addCard(username, userId, template);
      mutate({ cards: [...cards, card], pageCount: pageCount });
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
      {!(session?.user?.username) && <Text>Set your username:</Text>}
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
          <Spacer size="2rem" />
          <NewCard handleNewCard={handleNewCard} />
        </>
      ) : (
        <NewCard handleNewCard={handleNewCard} />
      )}
    </>
  );
}

export default ProfileLayout;

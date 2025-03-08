import Head from 'next/head';
import { Text } from 'theme-ui';
import Cards from '../../Cards';
import NewCard from '../../NewCard';
import { GridListSwitch, Pagination, Spacer } from '../../ui';
import { addCard } from '../../../utils/fetchers';
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
  });

  // New Card Creation
  // Take in template data
  const handleNewCard = async (template: Template, closeModal: Function) => {
    try {
      // Calls API to ADD Card (requires templateID only) which returns new cardID
      // Builds the card using all data provided
      // Uses mutate to update client side data immediately by adding it to existing cards array, getting new pageCount
      await addCard({
        templateID: template.id,
        templateName: template.name,
        templateReqs: template.reqs,
        userID: userId,
        username,
        cards,
        mutate
      });
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

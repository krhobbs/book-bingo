import Head from 'next/head';
import { Text } from 'theme-ui';
import Cards from '../../Cards';
import NewCard from '../../NewCard';
import { GridListSwitch, Pagination, Spacer } from '../../ui';
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
  const { cards, createCardOpt, updateCardOpt, deleteCardOpt, archiveCardOpt } = useCards({
    filters: {
      page,
      archived: false,
      userIds: [userId]
    }, fallback: { cards: fallbackCards, pageCount: pageCount }
  });

  const handleNewCard = async (template: Template, closeModal: Function) => {
    try {
      await createCardOpt({
        templateID: template.id,
        templateName: template.name,
        templateReqs: template.reqs,
        userID: userId,
        username
      })
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
      {cards.length >= 1 && (
        <>
          <Cards cards={cards} updateCardOpt={updateCardOpt} deleteCardOpt={deleteCardOpt} archiveCardOpt={archiveCardOpt} />
          {pageCount > 1 && (
            <>
              <Spacer size="1rem" />
              <Pagination pageCount={pageCount} currentPage={page} />
            </>
          )}
        </>
      )}
      <Spacer size="2rem" />
      <NewCard handleNewCard={handleNewCard} />
    </>
  );
}

export default ProfileLayout;

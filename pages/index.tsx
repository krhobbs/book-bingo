import HomeLayout from '../components/layout/pages/HomeLayout';
import { connectDatabase, getCards } from '../utils/db-utils';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

function putUsersCardFirst(cards: Card[], username: string) {
  const usersCards: number[] = cards.reduce(
    (acc, card, idx) => (
      card.user === username && acc.push(idx), acc
    ),
    []
  );

  usersCards.forEach((idx) => {
    cards.unshift(cards.splice(idx, 1)[0]);
  });
  return cards;
}

export default function Home({ cards }: { cards: Card[] }) {
  const { data: session, status } = useSession();
  const sorted = useMemo(() => {
    const sortedCards = [...cards];
    if (status === 'authenticated') {
      putUsersCardFirst(sortedCards, session.user.username)
    }
    return sortedCards;
  }, [cards, status, session]);

  return <HomeLayout cards={sorted} />;
}

export async function getStaticProps() {
  try {
    const client = await connectDatabase();
    const cards = await getCards(client, { archived: false });
    client.close();

    return {
      props: {
        cards: cards,
      },
      revalidate: 800,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

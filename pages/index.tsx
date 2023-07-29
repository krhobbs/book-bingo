import HomeLayout from '../components/layout/pages/HomeLayout';
import { connectDatabase, getCards } from '../utils/db-utils';

export default function Home({ cards }: { cards: Card[] }) {
  return <HomeLayout cards={cards} />;
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

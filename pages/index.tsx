import HomeLayout from '../components/layout/pages/HomeLayout';
import { connectDatabase, getDocuments } from '../utils/db-utils';

export default function Home({ cards } : { cards: Card[] }) {
  return <HomeLayout cards={cards} />;
}

export async function getStaticProps() {
  try {
    const client = await connectDatabase();
    const cards = await getDocuments(client, 'cards', { archived: false });
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

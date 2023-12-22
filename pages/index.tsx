import HomeLayout from '../components/layout/pages/HomeLayout';
import { getAllCards } from '../utils/db-utils';

export default function Home({ cards }: { cards: Card[] }) {
  return <HomeLayout cards={cards} />;
}

export async function getStaticProps() {
  try {
    const cards = await getAllCards();

    return {
      props: {
        cards: cards,
      },
      revalidate: 800,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        cards: [],
      },
      revalidate: 800
    };
  }
}

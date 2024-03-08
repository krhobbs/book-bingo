import HomeLayout from '../components/layout/pages/HomeLayout';
import { getAllCards } from '../utils/db-utils';

export default function Home({ cards, pageCount }: { cards: Card[], pageCount: number }) {
  return <HomeLayout cards={cards} pageCount={pageCount} />;
}

export async function getStaticProps() {
  try {
    const [cards, pageCount] = await getAllCards();

    return {
      props: {
        cards: cards,
        pageCount: pageCount
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

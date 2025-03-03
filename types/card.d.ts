interface Book {
  title: string;
  author: string;
  cover?: string;
}
interface Square {
  id: string;
  req: string;
  book?: Book;
  color?: string;
}

interface Card {
  _id: string;
  archived: boolean;
  squares: Square[];
  user: {
    id: string;
    name: string;
  };
  template: {
    id: string;
    name: string;
  };
}

interface Template {
  _id: string;
  name: string;
  reqs: string[];
  user: {
    id: string;
    name: string;
  };
}

type UpdateSingleSquareFunction = (
  cardId: string,
  squareId: string,
) => Promise<void>;

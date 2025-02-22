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
  user: string;
  user_id: string;
  template: string;
  archived: boolean;
  squares: Square[];
}

interface Template {
  _id: string;
  name: string;
  user: string;
  reqs: string[];
}

type UpdateSingleSquareFunction = (
  cardId: string,
  squareId: string,
) => Promise<void>;

interface Book {
  title: string;
  author: string;
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
  archived: boolean;
  squares: Square[];
}

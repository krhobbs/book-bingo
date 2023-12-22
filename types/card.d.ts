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

interface Card {
  _id: string;
  user: string;
  archived: boolean;
  squares: {
    id: string;
    req: string;
    color?: string;
    book?: {
      title: string;
      author: string;
    };
  }[];
}

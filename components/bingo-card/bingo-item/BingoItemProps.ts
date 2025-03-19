export interface ItemProps {
  archived: boolean;
  cardId: string;
  square: Square;
  usersCard: boolean;
  handleUpdateCardSquare: UpdateSingleSquareFunction;
}

export interface GridItemProps extends ItemProps {
  flipped: boolean;
  handleFlipCardSquare: (id: number) => void;
}

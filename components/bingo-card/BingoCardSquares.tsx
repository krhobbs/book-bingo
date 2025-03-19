import BingoItem from './bingo-item/grid-view/GridItem';
import BingoListItem from './bingo-item/list-view/ListItem';
import { useViewContext } from '../../hooks/useViewContext';
import Squares from '../Squares';
export interface BingoCardSquaresProps {
  archived: boolean;
  cardId: string;
  squares: Square[];
  usersCard: boolean;
  handleUpdateCardSquare: UpdateSingleSquareFunction;
  handleFlipCardSquare: (id: number) => void;
  flippedArray: boolean[];
}

function BingoCardSquares({
  archived,
  cardId,
  squares,
  usersCard,
  handleUpdateCardSquare,
  handleFlipCardSquare,
  flippedArray,
}: BingoCardSquaresProps) {
  const { view } = useViewContext();

  return (
    <Squares>
      {view === 'grid' ?
        (squares.map((square: Square, idx: number) => {
          return (
            <BingoItem
              key={square.id}
              cardId={cardId}
              archived={archived}
              square={square}
              usersCard={usersCard}
              handleUpdateCardSquare={handleUpdateCardSquare}
              handleFlipCardSquare={handleFlipCardSquare}
              flipped={flippedArray[idx]}
            />
          );
        })) :
        (squares.map((square: Square) => {
          return (
            <BingoListItem
              key={square.id}
              cardId={cardId}
              archived={archived}
              square={square}
              usersCard={usersCard}
              handleUpdateCardSquare={handleUpdateCardSquare}
            />
          );
        }))}
    </Squares>

  );
}

export default BingoCardSquares;

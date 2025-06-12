export interface CreateCardProps {
  cardID: string;
  templateID: string;
  templateName: string;
  templateReqs: string[];
  userID: string;
  username: string;
}

export interface UpdateSquareProps {
  cards: Card[];
  cardID: string;
  square: Square;
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'An unknown error occurred.';
}

export function isValidUUID(uuid: string) {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Builds a new, empty Card object
 */
export function buildEmptyCard({
  cardID,
  templateID,
  templateName,
  templateReqs,
  userID,
  username,
}: CreateCardProps): Card {
  return {
    id: cardID,
    user: {
      id: userID,
      name: username,
    },
    template: {
      id: templateID,
      name: templateName,
    },
    archived: false,
    squares: templateReqs.map((req, idx) => {
      return {
        id: `${idx}`,
        req: req,
        book: undefined,
        color: undefined,
      } as Square;
    }),
  };
}

/**
 * Updates a single square in single card from a list of cards
 */
export function updateSquare({ cards, cardID, square }: UpdateSquareProps) {
  const newCards = cards.map((c: Card) => {
    if (c.id === cardID) {
      const newSquares = c.squares.map((s: Square) => {
        if (s.id === square.id) {
          return { ...s, book: square.book, color: square.color };
        } else {
          return s;
        }
      });
      return { ...c, squares: newSquares };
    } else {
      return c;
    }
  });

  return newCards;
}

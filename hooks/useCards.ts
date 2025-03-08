import useSWR from 'swr';
import { fetchCards } from '../utils/fetchers';

interface UseCardsProps {
  filters: CardsFilters;
  fallback: { cards: Card[]; pageCount: number };
}

export default function useCards({ filters, fallback }: UseCardsProps) {
  const params = new URLSearchParams();
  params.append('archived', (filters.archived ?? false).toString());
  filters.userIds?.forEach((id) => {
    params.append('user_id', id);
  });
  params.append('page', (filters.page ?? 1).toString());

  const { data, isLoading, error, mutate } = useSWR(
    `/api/cards?${params.toString()}`,
    fetchCards,
    { fallbackData: fallback },
  );

  const createCard = async ({
    templateID,
    templateName,
    templateReqs,
    userID,
    username,
  }: {
    templateID: string;
    templateName: string;
    templateReqs: string[];
    userID: string;
    username: string;
  }) => {
    const response = await fetch('/api/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ templateID }),
    });
    const { cardId } = await response.json();

    const newCard: Card = {
      _id: cardId,
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

    const newCards = [newCard, ...data.cards];
    const newPageCount = Math.ceil((newCards.length + 1) / 10);
    mutate({ cards: newCards, pageCount: newPageCount });
  };

  return {
    cards: data?.cards ?? [],
    isLoading,
    error,
    mutate,
  };
}

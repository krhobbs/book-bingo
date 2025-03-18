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

  return {
    cards: data?.cards ?? [],
    isLoading,
    error,
    mutate,
  };
}

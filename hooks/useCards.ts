import useSWR from 'swr';
import {
  createCard,
  deleteCard,
  fetchCards,
  updateCard,
} from '../utils/fetchers';
import {
  type CreateCardProps,
  UpdateSquareProps,
  buildEmptyCard,
  updateSquare,
} from '../utils/api-utils';

interface UseCardsProps {
  filters: CardsFilters;
  fallback?: { cards: Card[]; pageCount: number };
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

  let cardData = data ? data : { cards: [], pageCount: 0 };

  const createCardOpt = async (props: Omit<CreateCardProps, 'cardID'>) => {
    const optNewCard = buildEmptyCard({
      ...props,
      cardID: `temp-${Date.now()}-${Math.random()}`,
    });
    mutate(
      async () => {
        const cardID = await createCard(props.templateID);
        const newCard = { ...optNewCard, cardID };

        const newCards = [newCard, ...cardData.cards];

        return { cards: newCards, pageCount: cardData.pageCount };
      },
      {
        optimisticData: () => {
          const newCards = [optNewCard, ...cardData.cards];

          return { cards: newCards, pageCount: cardData.pageCount };
        },
        revalidate: false,
        rollbackOnError: true,
      },
    );
  };

  const deleteCardOpt = async (cardID: string) => {
    const newCards = cardData.cards.filter((c) => c.id !== cardID);
    const updatedData = { cards: newCards, pageCount: cardData.pageCount };
    mutate(
      async () => {
        await deleteCard(cardID);
        return updatedData;
      },
      {
        optimisticData: updatedData,
        revalidate: false,
        rollbackOnError: true,
      },
    );
  };

  const updateCardOpt = async (props: Omit<UpdateSquareProps, 'cards'>) => {
    const newCards = updateSquare({ ...props, cards: cardData.cards });
    const updatedData = { cards: newCards, pageCount: cardData.pageCount };

    mutate(
      async () => {
        await updateCard(props.cardID, undefined, props.square);
        return updatedData;
      },
      {
        optimisticData: updatedData,
        revalidate: false,
        rollbackOnError: true,
      },
    );
  };

  const archiveCardOpt = async (cardID: string, archived: boolean) => {
    const newCards = cardData.cards.filter((c) => c.id !== cardID);
    const updatedData = { cards: newCards, pageCount: cardData.pageCount };
    mutate(
      async () => {
        await updateCard(cardID, archived);
        return updatedData;
      },
      {
        optimisticData: updatedData,
        revalidate: false,
        rollbackOnError: true,
      },
    );
  };

  return {
    cards: cardData.cards,
    isLoading,
    error,
    mutate,
    createCardOpt,
    deleteCardOpt,
    updateCardOpt,
    archiveCardOpt,
  };
}

import useSWR from 'swr';
import { fetchTemplates } from '../utils/fetchers';

interface UseTemplatesProps {
  filters: {
    page: number;
  };
  fallback: { templates: Template[]; pageCount: number };
}

export default function useTemplates({ filters, fallback }: UseTemplatesProps) {
  const params = new URLSearchParams();
  params.append('page', (filters.page ?? 1).toString());

  const { data, isLoading, error, mutate } = useSWR(
    `/api/templates?${params.toString()}`,
    fetchTemplates,
    { fallbackData: fallback },
  );

  return {
    templates: data?.templates ?? [],
    isLoading,
    error,
    mutate,
  };
}

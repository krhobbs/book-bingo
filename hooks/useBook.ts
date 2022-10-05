import useSWR from "swr";

export function useBook(id) {
  const { data, error } = useSWR(`/api/books/${id}`);

  return {
    book: data,
    isLoading: !error && !data,
    isError: error,
  };
}

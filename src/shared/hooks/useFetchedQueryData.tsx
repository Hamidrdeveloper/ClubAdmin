import { useQueryClient } from 'react-query';

type props = {
  queryKey: string;
};

export default function useFetchedQueryData<T>({ queryKey }: props): T | undefined {
  const client = useQueryClient();

  return client.getQueryData(queryKey);
}

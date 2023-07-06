import { useQuery, useQueryClient } from 'react-query';

import { CopyEventRequest } from 'hooks/storages/useCopyParameter';

export const useCopyEventQuery = (
  request: CopyEventRequest,
  enabled: boolean,
  refetchInterval: number,
  onSuccess: (data: any) => void,
  onError: (data: any) => void
) => {
  const queryClient = useQueryClient();
  const queryKey = ['get-copy-event', request.fromTopic, request.toTopic];
  const { isLoading, data, refetch, isRefetching, isSuccess } = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch(
        `${KB_ENVIRONMENTS.KB_API}/copy-event?fromTopic=${request.fromTopic}&toTopic=${request.toTopic}`
      );

      if (!res.ok) {
        throw new Error();
      }

      return res.json();
    },
    enabled: enabled,
    refetchInterval,
    refetchOnWindowFocus: false,
    initialData: undefined,
    retry: false,
    onError,
    onSuccess,
  });

  const removeCache = () => {
    queryClient.resetQueries({ queryKey, exact: true });
  };

  return { isLoading, data, refetch, isRefetching, isSuccess, removeCache };
};

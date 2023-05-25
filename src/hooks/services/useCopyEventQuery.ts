import { useQuery } from 'react-query';

import { CopyEventRequest } from 'hooks/storages/useCopyParameter';

export const useCopyEventQuery = ({ fromTopic, toTopic }: CopyEventRequest) => {
  const { isLoading, data, refetch, isRefetching, isSuccess } = useQuery({
    queryKey: ['get-copy-event', fromTopic, toTopic],
    queryFn: async () => {
      const res = await fetch(
        `${KB_ENVIRONMENTS.KB_API}/copy-event?fromTopic=${fromTopic}&toTopic=${toTopic}`
      );

      if (!res.ok) {
        throw new Error();
      }

      return res.json();
    },
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
    onError: () => {},
    onSuccess: () => {},
  });

  return { isLoading, data, refetch, isRefetching, isSuccess };
};

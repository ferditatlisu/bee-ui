import { useQuery } from 'react-query';

import { UserKafkaClusterResponse } from 'hooks/storages/useUserKafkaCluster';

export const useKafkaClusterQuery = () => {
  const { isLoading, data } = useQuery<
    unknown,
    unknown,
    UserKafkaClusterResponse[]
  >({
    queryKey: ['get-kafka-cluster'],
    queryFn: async () => {
      const res = await fetch(`${KB_ENVIRONMENTS.KB_API}/kafka-cluster`);
      if (!res.ok) {
        throw new Error();
      }

      return res.json();
    },
    retry: true,
    refetchOnWindowFocus: false,
  });

  return { isLoading, data };
};

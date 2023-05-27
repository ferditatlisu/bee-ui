import { useQuery } from 'react-query';

import { useUserKafkaCluster } from 'hooks/storages/useUserKafkaCluster';

export const useGetConsumers = () => {
  const kafkaCluster = useUserKafkaCluster((x) => x.kafkaCluster);
  const { isLoading, data } = useQuery({
    queryKey: ['consumers', kafkaCluster.id],
    queryFn: async () => {
      const res = await fetch(`${KB_ENVIRONMENTS.KB_API}/consumers`, {
        headers: { kafka_id: kafkaCluster.id },
      });
      return res.json();
    },
    keepPreviousData: true,
    staleTime: Infinity,
  });

  return { isLoading, data };
};

import { useQuery } from 'react-query';

import { useUserKafkaCluster } from 'hooks/storages/useUserKafkaCluster';

export const useGetTopics = () => {
  const kafkaCluster = useUserKafkaCluster((x) => x.kafkaCluster);
  const { isLoading, data } = useQuery({
    queryKey: ['topics', kafkaCluster.id],
    queryFn: async () => {
      const res = await fetch(`${KB_ENVIRONMENTS.KB_API}/topics`, {
        headers: { kafka_id: kafkaCluster.id },
      });
      return res.json();
    },
    keepPreviousData: true,
    staleTime: Infinity,
  });

  return { isLoading, data };
};

import { useQuery } from 'react-query';

import { useUserKafkaCluster } from 'hooks/storages/useUserKafkaCluster';

export const useConsumerGroupByTopicQuery = (topic_name: string) => {
  const kafkaCluster = useUserKafkaCluster((x) => x.kafkaCluster);
  const { isLoading, data, refetch, isRefetching } = useQuery({
    queryKey: ['consumer-group-by-topic', topic_name],
    queryFn: async () => {
      const res = await fetch(
        `${KB_ENVIRONMENTS.KB_API}/consumer-group-by-topic?topic=${topic_name}`,
        {
          headers: { 'kafka-id': kafkaCluster.id },
        }
      );
      return res.json();
    },
    keepPreviousData: true,
    staleTime: Infinity,
    retry: true,
  });

  return { isLoading, data, refetch, isRefetching };
};

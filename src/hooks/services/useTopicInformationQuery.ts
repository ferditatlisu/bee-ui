import { useQuery } from 'react-query';

import { useUserKafkaCluster } from 'hooks/storages/useUserKafkaCluster';

export const useTopicInformationQuery = (topic_name: string) => {
  const kafkaCluster = useUserKafkaCluster((x) => x.kafkaCluster);
  const { isLoading, data, refetch, isRefetching } = useQuery({
    queryKey: ['get-topic-info', topic_name],
    queryFn: async () => {
      const res = await fetch(
        `${KB_ENVIRONMENTS.KB_API}/get-topic-info?topic=${topic_name}`,
        {
          headers: { 'kafka-id': kafkaCluster.id },
        }
      );
      return res.json();
    },
    keepPreviousData: true,
    retry: 2,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return { isLoading, data, refetch, isRefetching };
};

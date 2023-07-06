import { useQuery } from 'react-query';

import { useUserKafkaCluster } from 'hooks/storages/useUserKafkaCluster';

export const useTopicInformationQuery = (
  topic_name: string,
  refetchInterval: number
) => {
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

      if (!res.ok) {
        return Promise.reject(res);
      }

      return res.json();
    },
    keepPreviousData: true,
    refetchInterval,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const resultData = data ?? {
    message_count: '-',
    retention_day: '-',
    partition_count: '-',
  };

  return { isLoading, data: resultData, refetch, isRefetching };
};

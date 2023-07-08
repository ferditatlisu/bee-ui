import { useQuery } from 'react-query';

import { useUserKafkaCluster } from 'hooks/storages/useUserKafkaCluster';

export const useTopicConfigurationQuery = (topic_name: string) => {
  const kafkaCluster = useUserKafkaCluster((x) => x.kafkaCluster);
  const { isLoading, data, refetch } = useQuery({
    queryKey: ['get-topic-configuration', topic_name],
    queryFn: async () => {
      const res = await fetch(
        `${KB_ENVIRONMENTS.KB_API}/get-topic-configuration?topic=${topic_name}`,
        {
          headers: { 'kafka-id': kafkaCluster.id },
        }
      );

      if (!res.ok) return Promise.reject(res);

      return res.json();
    },
    keepPreviousData: true,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return { isLoading, data, refetch };
};

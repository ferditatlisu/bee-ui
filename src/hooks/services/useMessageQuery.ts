import { useQuery } from 'react-query';

import { useUserKafkaCluster } from 'hooks/storages/useUserKafkaCluster';

export const useMessageQuery = (
  topic_name: string,
  partition: number | undefined,
  offset: number | undefined,
  enabled: boolean
) => {
  const kafkaCluster = useUserKafkaCluster((x) => x.kafkaCluster);
  var url = `${KB_ENVIRONMENTS.KB_API}/get-message?topic=${topic_name}`;
  if (offset !== undefined) {
    url += `&offset=${offset}&partition=${partition}`;
  }

  const { isLoading, data, refetch, isRefetching } = useQuery({
    queryKey: ['get-message', topic_name, offset, partition],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: { 'kafka-id': kafkaCluster.id },
      });
      return res.json();
    },
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: enabled,
    refetchOnWindowFocus: false,
  });

  return { isLoading, data, refetch, isRefetching };
};

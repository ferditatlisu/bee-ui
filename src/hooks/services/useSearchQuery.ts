import { useQuery } from 'react-query';

import { useUserKafkaCluster } from 'hooks/storages/useUserKafkaCluster';

export const useSearchQuery = (
  inputs: any,
  refetchIntervalData: number,
  enabled: boolean,
  onSuccess: () => void
) => {
  const kafkaCluster = useUserKafkaCluster((x) => x.kafkaCluster);
  const { isLoading, data, refetch, isRefetching } = useQuery({
    queryFn: async () => {
      const res = await fetch(
        `${KB_ENVIRONMENTS.KB_API}/search?topicName=${inputs.topicName}&value=${inputs.value}`,
        {
          headers: { 'kafka-id': kafkaCluster.id },
        }
      );
      return res.json();
    },
    enabled: enabled,
    refetchInterval: refetchIntervalData,
    keepPreviousData: true,
    staleTime: Infinity,
    onSuccess: onSuccess,
  });

  return { isLoading, data, refetch, isRefetching };
};

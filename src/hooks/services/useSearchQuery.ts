import { useQuery } from 'react-query';

import { SearchRequest } from 'hooks/storages/useSearchParameter';
import { useUserKafkaCluster } from 'hooks/storages/useUserKafkaCluster';

const INTERNAL_REQUEST_MS = 3000;

export interface SearchResponse {
  status: string;
  createdDate: string;
  completedTime: string | undefined;
  error: string | undefined;
  data: any[];
}

export const useSearchQuery = (
  inputs: SearchRequest,
  enabled: boolean,
  onSuccess: (data: any) => void,
  onError: (err: Error) => void
) => {
  const kafkaCluster = useUserKafkaCluster((x) => x.kafkaCluster);
  const { isLoading, data, isRefetching } = useQuery<
    any,
    Error,
    SearchResponse,
    string[]
  >({
    queryKey: ['search', inputs.topicName, inputs.value],
    queryFn: async () => {
      const res = await fetch(
        `${KB_ENVIRONMENTS.KB_API}/search?topicName=${inputs.topicName}&value=${inputs.value}`,
        {
          headers: { 'kafka-id': kafkaCluster.id },
        }
      );

      if (!res.ok) {
        var errMsg = await res.json();
        throw new Error(errMsg['message']);
      }

      return res.json();
    },
    enabled: enabled,
    refetchInterval: INTERNAL_REQUEST_MS,
    keepPreviousData: true,
    staleTime: Infinity,
    onSuccess,
    onError,
  });

  return { isLoading, data, isRefetching };
};

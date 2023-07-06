import { useQuery } from 'react-query';

import { useToast } from '@chakra-ui/react';

import { ChangeOffsetRequest } from 'hooks/storages/useOffsetParameter';
import { useUserKafkaCluster } from 'hooks/storages/useUserKafkaCluster';

export const useSimulationChangeOffsetQuery = ({
  group_id,
  topic_name,
  offset_type,
  value,
}: ChangeOffsetRequest) => {
  const kafkaCluster = useUserKafkaCluster((x) => x.kafkaCluster);
  const toast = useToast();
  const { isLoading, data, refetch, isRefetching } = useQuery({
    queryKey: [
      'consumer-group-by-group-id',
      group_id,
      topic_name,
      offset_type,
      value,
    ],
    queryFn: async () => {
      var url = `${KB_ENVIRONMENTS.KB_API}/get-simulation-change-offset?group_id=${group_id}&topic_name=${topic_name}&offset_type=${offset_type}`;
      if (value !== undefined && value > -1) url += `&value=${value}`;

      const res = await fetch(url, {
        headers: { 'kafka-id': kafkaCluster.id },
      });
      if (!res.ok) {
        const data = await res.json();
        const message =
          data['message'] !== undefined
            ? data['message']
            : 'INTERNAL_SERVER_ERROR';

        throw new Error(message);
      }
      return res.json();
    },
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error instanceof Error && error.message,
        status: 'error',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      });
    },
  });

  return { isLoading, data, refetch, isRefetching };
};

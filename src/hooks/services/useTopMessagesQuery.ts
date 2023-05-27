import { useQuery } from 'react-query';

import { useUserKafkaCluster } from 'hooks/storages/useUserKafkaCluster';

export interface TopicMessageDto {
  topic: string;
  size: number | undefined;
  partition: number | undefined;
}

export const useTopMessagesQuery = ({
  topic,
  size,
  partition,
}: TopicMessageDto) => {
  const kafkaCluster = useUserKafkaCluster((x) => x.kafkaCluster);
  const { isLoading, data, refetch, isRefetching } = useQuery({
    queryKey: ['get-top-messages', topic, size, partition],
    queryFn: async () => {
      var url = `${KB_ENVIRONMENTS.KB_API}/get-top-messages?topic=${topic}`;
      if (size !== undefined) {
        url += `&size=${size}`;
      }

      if (!(partition === undefined || Number.isNaN(partition))) {
        url += `&partition=${partition}`;
      }

      const res = await fetch(url, {
        headers: { 'kafka-id': kafkaCluster.id },
      });
      return res.json();
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  return { isLoading, data, refetch, isRefetching };
};

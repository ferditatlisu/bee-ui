import { useMutation } from 'react-query';

import { useUserKafkaCluster } from 'hooks/storages/useUserKafkaCluster';

interface PublishMessageDto {
  key: string | undefined;
  headers: string | undefined;
  value: string;
}

export const usePublishMessageMutation = (topicName: string) => {
  const kafkaCluster = useUserKafkaCluster((x) => x.kafkaCluster);
  const { mutate } = useMutation({
    mutationFn: async ({ key, headers, value }: PublishMessageDto) => {
      var defaultHeaders: HeadersInit | undefined;
      if (!!headers) {
        defaultHeaders = { headers };
      }

      var url = `${KB_ENVIRONMENTS.KB_API}/${topicName}/publish-message`;
      if (!!key) {
        url += `?key=${key}`;
      }

      const res = await fetch(url, {
        body: value,
        method: 'POST',
        headers: { ...defaultHeaders, 'kafka-id': kafkaCluster.id },
      });
      return res.json();
    },
  });

  return { mutate };
};

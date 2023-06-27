import { useMutation } from 'react-query';

import { useUserKafkaCluster } from 'hooks/storages/useUserKafkaCluster';

export interface TopicConfigurationRequest {
  key: string;
  value: string | undefined;
}

export const useTopicConfigMutation = (topicName: string) => {
  const kafkaCluster = useUserKafkaCluster((x) => x.kafkaCluster);
  const { mutate } = useMutation<unknown, unknown, TopicConfigurationRequest>({
    mutationFn: async (request) => {
      const url = `${KB_ENVIRONMENTS.KB_API}/${topicName}/topic-configuration`;
      const res = await fetch(url, {
        body: JSON.stringify(request),
        method: 'PUT',
        headers: { 'kafka-id': kafkaCluster.id },
      });

      if (!res.ok) {
        throw new Error((await res.json())['message']);
      }

      return res.json();
    },
  });

  return { mutate };
};

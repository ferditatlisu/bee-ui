import { useMutation } from 'react-query';

import { useUserKafkaCluster } from 'hooks/storages/useUserKafkaCluster';

export const useDeleteTopicMutation = () => {
  const kafkaCluster = useUserKafkaCluster((x) => x.kafkaCluster);
  const { mutate } = useMutation({
    mutationFn: async (topic: string) => {
      var url = `${KB_ENVIRONMENTS.KB_API}/topics?topic=${topic}`;
      const res = await fetch(url, {
        method: 'DELETE',
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

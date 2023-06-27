import { useMutation } from 'react-query';

import { useUserKafkaCluster } from 'hooks/storages/useUserKafkaCluster';

export interface PostCopyEventRequest {
  fromTopic: string;
  fromId: string;
  toTopic: string;
  toId: string;
}

export const useCopyEventMutation = () => {
  const kafkaCluster = useUserKafkaCluster((x) => x.kafkaCluster);
  const { mutate, isLoading, isSuccess } = useMutation<
    unknown,
    unknown,
    PostCopyEventRequest
  >({
    mutationFn: async (request) => {
      request.fromId = kafkaCluster.id;
      request.toId = kafkaCluster.id;
      const res = await fetch(`${KB_ENVIRONMENTS.KB_API}/copy-event`, {
        body: JSON.stringify(request),
        method: 'POST',
      });
      return res.json();
    },
  });

  return { mutate, mutateLoading: isLoading, mutateSuccess: isSuccess };
};

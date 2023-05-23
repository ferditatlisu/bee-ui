import { useQuery } from 'react-query';

import { useToast } from '@chakra-ui/react';

import { useGet } from 'hooks/services';
import { ChangeOffsetRequest } from 'hooks/storages/useOffsetParameter';
import { TopicMessageDto } from 'pages/TopicDetail/TopicDetailMessage';

export const useGetMessages = (inputs: any) =>
  useGet({
    url: `${KB_ENVIRONMENTS.KB_API}/search?topicName=${inputs.topicName}&value=${inputs.value}`,
  });

export const useGetSearch = (
  inputs: any,
  refetchIntervalData: number,
  enabled: boolean,
  onSuccess: () => void
) => {
  const { isLoading, data, refetch, isRefetching } = useQuery({
    queryFn: async () => {
      const res = await fetch(
        `${KB_ENVIRONMENTS.KB_API}/search?topicName=${inputs.topicName}&value=${inputs.value}`
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

export const useGetTopics = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['topics'],
    queryFn: async () => {
      const res = await fetch(`${KB_ENVIRONMENTS.KB_API}/topics`);
      return res.json();
    },
    keepPreviousData: true,
    staleTime: Infinity,
  });

  return { isLoading, data };
};

export const useGetConsumers = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['consumers'],
    queryFn: async () => {
      const res = await fetch(`${KB_ENVIRONMENTS.KB_API}/consumers`);
      return res.json();
    },
    keepPreviousData: true,
    staleTime: Infinity,
  });

  return { isLoading, data };
};

export const useGetConsumerGroupByTopic = (topic_name: string) => {
  const { isLoading, data, refetch, isRefetching } = useQuery({
    queryKey: ['consumer-group-by-topic', topic_name],
    queryFn: async () => {
      const res = await fetch(
        `${KB_ENVIRONMENTS.KB_API}/consumer-group-by-topic?topic=${topic_name}`
      );
      return res.json();
    },
    keepPreviousData: true,
    staleTime: Infinity,
  });

  return { isLoading, data, refetch, isRefetching };
};

export const useGetTopMessages = ({
  topic,
  size,
  partition,
}: TopicMessageDto) => {
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

      const res = await fetch(url);
      return res.json();
    },
    keepPreviousData: true,
  });

  return { isLoading, data, refetch, isRefetching };
};

export const useGetMessage = (
  topic_name: string,
  partition: number | undefined,
  offset: number | undefined,
  enabled: boolean
) => {
  var url = `${KB_ENVIRONMENTS.KB_API}/get-message?topic=${topic_name}`;
  if (offset !== undefined) {
    url += `&offset=${offset}&partition=${partition}`;
  }

  const { isLoading, data, refetch, isRefetching } = useQuery({
    queryKey: ['get-message', topic_name, offset, partition],
    queryFn: async () => {
      const res = await fetch(url);
      return res.json();
    },
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: enabled,
  });

  return { isLoading, data, refetch, isRefetching };
};

export const useGetTopicConfiguration = (topic_name: string) => {
  const { isLoading, data } = useQuery({
    queryKey: ['get-topic-configuration', topic_name],
    queryFn: async () => {
      const res = await fetch(
        `${KB_ENVIRONMENTS.KB_API}/get-topic-configuration?topic=${topic_name}`
      );
      return res.json();
    },
    keepPreviousData: true,
    staleTime: Infinity,
  });

  return { isLoading, data };
};

export const useGetTopicInformation = (topic_name: string) => {
  const { isLoading, data, refetch, isRefetching } = useQuery({
    queryKey: ['get-topic-info', topic_name],
    queryFn: async () => {
      const res = await fetch(
        `${KB_ENVIRONMENTS.KB_API}/get-topic-info?topic=${topic_name}`
      );
      return res.json();
    },
    keepPreviousData: true,
    staleTime: Infinity,
  });

  return { isLoading, data, refetch, isRefetching };
};

export const useGetConsumerInformation = (group_id: string) => {
  const { isLoading, data, refetch, isRefetching } = useQuery({
    queryKey: ['get-consumer-info', group_id],
    queryFn: async () => {
      const res = await fetch(
        `${KB_ENVIRONMENTS.KB_API}/get-consumer-info?group_id=${group_id}`
      );
      return res.json();
    },
    keepPreviousData: true,
    staleTime: Infinity,
  });

  return { isLoading, data, refetch, isRefetching };
};

export const useGetConsumerGroupByGroupId = (group_id: string) => {
  const { isLoading, data, refetch, isRefetching } = useQuery({
    queryKey: ['consumer-group-by-group-id', group_id],
    queryFn: async () => {
      const res = await fetch(
        `${KB_ENVIRONMENTS.KB_API}/consumer-group-by-group-id?group_id=${group_id}`
      );
      return res.json();
    },
    keepPreviousData: true,
    staleTime: Infinity,
  });

  return { isLoading, data, refetch, isRefetching };
};

export const useGetSimulationChangeOffset = ({
  group_id,
  topic_name,
  offset_type,
  value,
}: ChangeOffsetRequest) => {
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

      const res = await fetch(url);
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
    retry: 0,
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

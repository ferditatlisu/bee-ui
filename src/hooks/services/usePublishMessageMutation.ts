import { useMutation } from 'react-query';

interface PublishMessageDto {
  key: string | undefined;
  headers: string | undefined;
  value: string;
}

export const usePublishMessageMutation = (topicName: string) => {
  const { mutate } = useMutation({
    mutationFn: async ({ key, headers, value }: PublishMessageDto) => {
      var defaultHeaders: HeadersInit | undefined;
      if (!!headers) {
        debugger;
        defaultHeaders = { headers };
      }

      var url = `${KB_ENVIRONMENTS.KB_API}/${topicName}/publish-message`;
      if (!!key) {
        url += `?key=${key}`;
      }

      const res = await fetch(url, {
        body: value,
        method: 'POST',
        headers: defaultHeaders,
      });
      return res.json();
    },
  });

  return { mutate };
};

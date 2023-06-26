import { useMutation } from 'react-query';

export const useDeleteSearchMutation = () => {
  const { mutate } = useMutation({
    mutationFn: async ({ topicName, value }: any) => {
      var url = `${KB_ENVIRONMENTS.KB_API}/search?topicName=${topicName}&value=${value}`;
      const res = await fetch(url, {
        method: 'DELETE',
      });
      return res.json();
    },
  });

  return { mutate };
};

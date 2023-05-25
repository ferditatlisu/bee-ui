import { useMutation } from 'react-query';

export const useDeleteCopyEventMutation = () => {
  const { mutateAsync } = useMutation({
    mutationFn: async ({ fromTopic, toTopic }: any) => {
      var url = `${KB_ENVIRONMENTS.KB_API}/copy-event?fromTopic=${fromTopic}&toTopic=${toTopic}`;

      const res = await fetch(url, {
        method: 'DELETE',
      });
      return res.json();
    },
  });

  return { mutateAsync };
};

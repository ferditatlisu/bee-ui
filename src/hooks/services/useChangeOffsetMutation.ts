import { useMutation } from 'react-query';

import { ChangeOffsetRequest } from 'hooks/storages/useOffsetParameter';

export const useChangeOffsetMutation = () => {
  const { mutate, error } = useMutation<unknown, unknown, ChangeOffsetRequest>({
    mutationFn: async (request) => {
      const res = await fetch(`${KB_ENVIRONMENTS.KB_API}/put-change-offset`, {
        body: JSON.stringify(request),
        method: 'PUT',
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
  });

  return { mutate, error };
};

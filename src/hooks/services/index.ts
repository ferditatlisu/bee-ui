import { useMutation } from 'react-query';

export const useGet = ({ url }: { url: string }) => {
  const { mutate, data } = useMutation(async () => {
    const res = await fetch(url);
    return res.json();
  });

  return {
    mutate,
    data,
  };
};

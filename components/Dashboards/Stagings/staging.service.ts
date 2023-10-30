import { mutate } from 'swr';

export const deleteStaging = async (id: string) => {
  const response = await fetch(`/api/stagings/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200) mutate('api/stagings');
  return response;
};

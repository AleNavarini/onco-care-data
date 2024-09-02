import { mutate } from 'swr';

export const deleteFollowUp = async (id: string) => {
  const response = await fetch(`/api/follow-ups/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200) mutate('api/follow-ups');
  return response;
};

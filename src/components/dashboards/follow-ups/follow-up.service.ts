import { FollowUp } from '@prisma/client';
import { mutate } from 'swr';

export const deleteFollowUp = async (followUp: FollowUp) => {
  const response = await fetch(`/api/v1/follow-ups/${followUp.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200)
    mutate(`/api/v1/patient-follow-ups/${followUp.patientId}`);
  return response;
};

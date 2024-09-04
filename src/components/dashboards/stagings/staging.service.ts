import { Staging } from '@prisma/client';
import { mutate } from 'swr';

export const deleteStaging = async (staging: Staging) => {
  const response = await fetch(`/api/v1/stagings/${staging.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200)
    mutate(`/api/v1/patient-stagings/${staging.patientId}`);
  return response;
};

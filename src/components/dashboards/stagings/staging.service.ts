import { Staging } from '@prisma/client';
import { mutate } from 'swr';

export const deleteStaging = async (staging: Staging) => {
  const response = await fetch(`/api/stagings/${staging.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200) mutate(`/api/patient-stagings/${staging.patientId}`);
  return response;
};

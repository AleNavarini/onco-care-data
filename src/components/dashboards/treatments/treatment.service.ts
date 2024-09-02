import { mutate } from 'swr';

export const deleteStudy = async (id: string, patientId: string) => {
  const response = await fetch(`/api/studies/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200) mutate(`/api/patient-studies/${patientId}`);
  return response;
};

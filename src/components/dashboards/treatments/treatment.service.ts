import { mutate } from 'swr';

export const deleteStudy = async (id: string, patientId: string) => {
  const response = await fetch(`/api/v1/treatments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200)
    mutate(`/api/v1/patient-treatments/${patientId}`);
  return response;
};

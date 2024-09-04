export const deletePatient = async (patientId: string) => {
  const response = await fetch(`/api/v1/patients/${patientId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

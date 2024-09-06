export const deleteTreatmentType = async (treatmentTypeId: string) => {
  const response = await fetch(`/api/v1/treatment-types/${treatmentTypeId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

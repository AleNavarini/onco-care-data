export const deleteTreatmentType = async (treatmentTypeId: string) => {
  const response = await fetch(`/api/treatment-types/${treatmentTypeId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

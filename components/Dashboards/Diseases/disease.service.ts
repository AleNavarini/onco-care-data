export const deleteDisease = async (diseaseId: string) => {
  const response = await fetch(`/api/diseases/${diseaseId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const deleteRiskFactor = async (id: string) => {
  const response = await fetch(`/api/v1/risk-factors/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

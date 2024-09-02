export const deleteStudyType = async (id: string) => {
  const response = await fetch(`/api/study-types/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

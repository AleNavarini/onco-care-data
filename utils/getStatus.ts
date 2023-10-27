export const getStatus = (status: string) => {
  if (status === 'following') return 'En seguimiento';
  return 'Activa';
};

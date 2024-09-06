export function mapStatus(status: any) {
  const activeStatuses = ['active', 'activa', 'activo'];
  const mappedStatus = activeStatuses.includes(status.toLowerCase())
    ? 'active'
    : 'following';
  return mappedStatus;
}

export function reverseMapStatus(status: string) {
  if (status === 'active') return 'Activa';
  else if (status === 'following') return 'En Seguimiento';
  else return status;
}

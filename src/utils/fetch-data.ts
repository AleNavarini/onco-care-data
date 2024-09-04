export async function fetchData(endpoint: string, method: string, data: any) {
  const response = await fetch(`/api/v1/${endpoint}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

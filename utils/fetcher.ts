const fetcher = async (url: string): Promise<any> => {
  const response = await fetch(url).then((res) => res.json());
  return response as Promise<any>;
};

export default fetcher;

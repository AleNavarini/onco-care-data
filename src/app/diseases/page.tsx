'use client';
import BarChart from '@/components/charts/bar';
import fetcher from '@/utils/fetcher';
import { Sheet } from '@mui/joy';

import React from 'react';
import useSWR from 'swr';

const ActiveFollowingChart: React.FC = () => {
  const { data, isLoading, error } = useSWR('/api/stats/status', fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Sheet>
      <BarChart data={data} width={600} height={400} />
    </Sheet>
  );
};
export default function ManagePage() {
  return (
    <Sheet
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 3,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActiveFollowingChart />
    </Sheet>
  );
}

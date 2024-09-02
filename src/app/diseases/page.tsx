'use client';
import ActiveFollowingChart from '@/components/diseases/active-following-chart';
import DiseasesChart from '@/components/diseases/diseases-chart';
import StagingsChart from '@/components/diseases/stagings-chart';
import { Sheet } from '@mui/joy';
import React from 'react';

export default function ManagePage() {
  return (
    <Sheet
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: '1fr 1fr',
        },
        gridTemplateRows: 'auto',
        gap: 3,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActiveFollowingChart />
      <DiseasesChart />
      <StagingsChart />

    </Sheet>
  );
}

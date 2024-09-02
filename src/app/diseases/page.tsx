'use client';
import ActiveFollowingChart from '@/components/diseases/active-following-chart';
import { Sheet } from '@mui/joy';
import React from 'react';


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

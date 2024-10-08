'use client';
import ActiveFollowingChart from '@/components/diseases/active-following-chart';
import DiseasesChart from '@/components/diseases/diseases-chart';
import StagingsChart from '@/components/diseases/stagings-chart';
import React from 'react';

export default function ManagePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 min-h-full w-full max-h-full">
      <ActiveFollowingChart />
      <DiseasesChart />
      <StagingsChart />
    </div>
  );
}

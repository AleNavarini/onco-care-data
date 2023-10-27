'use client';

import useSWR from 'swr';
import { Typography } from '@mui/joy';
import PatientsDashboard from '@/components/Dashboards/PatientsDashboard';
import LoadingOverlay from '@/components/Common/LoadingOverlay';
import fetcher from '@/utils/fetcher';
import { Suspense } from 'react';

export default function Home() {
  const { data } = useSWR('/api/patients', fetcher, { suspense: true });

  return (
    <Suspense fallback={<LoadingOverlay />}>
      <Typography level="h1">Pacientes</Typography>
      <PatientsDashboard patients={data.patients} />
    </Suspense>
  );
}

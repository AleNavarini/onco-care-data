'use client';

import { Typography } from '@mui/joy';
import PatientsDashboard from '@/components/Dashboards/Patients/PatientsDashboard';
import LoadingOverlay from '@/components/Common/LoadingOverlay';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <Typography level="h1">Pacientes</Typography>
      <PatientsDashboard />
    </Suspense>
  );
}

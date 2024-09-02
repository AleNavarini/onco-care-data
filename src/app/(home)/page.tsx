'use client';

import { Sheet, Typography } from '@mui/joy';
import PatientsDashboard from '@/components/dashboards/Patients/PatientsDashboard';
import { Suspense } from 'react';
import CenteredPage from '@/components/ui/centered-page';
import { CircularProgress } from '@mui/material';

export default function Home() {
  return (
    <>
      <Typography level="h1">Pacientes</Typography>
      <PatientsDashboard />
    </>
  );
}

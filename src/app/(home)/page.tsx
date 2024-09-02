'use client';

import { Typography } from '@mui/joy';
import PatientsDashboard from '@/components/dashboards/patients/patients-dashboard';

export default function Home() {
  return (
    <>
      <Typography level="h1">Pacientes</Typography>
      <PatientsDashboard />
    </>
  );
}

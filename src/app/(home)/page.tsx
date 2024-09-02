'use client';

import { Sheet, Typography } from '@mui/joy';
import PatientsDashboard from '@/components/dashboards/patients/patients-dashboard';
import MissingFollowUps from '@/components/home/missing-follow-up';

export default function Home() {
  return (
    <Sheet>
      <MissingFollowUps />
      <Typography level="h2" sx={{ mb: 2 }}>
        Todos los Pacientes
      </Typography>
      <PatientsDashboard />
    </Sheet>
  );
}

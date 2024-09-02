'use client';

import { Typography } from '@mui/joy';
import PatientsDashboard from '@/components/dashboards/patients/patients-dashboard';
import MissingFollowUps from '@/components/home/missing-follow-up';

export default function Home() {
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800">
      <MissingFollowUps />
      <h1 className="mb-2">Pacientes</h1>
      <PatientsDashboard />
    </div>
  );
}

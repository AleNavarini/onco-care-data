'use client';

import PatientsDashboard from '@/components/dashboards/patients/patients-dashboard';
import MissingFollowUps from '@/components/home/missing-follow-up';

export default function Home() {
  return (
    <div className="p-4">
      <MissingFollowUps />
      <h1 className="mb-2 text-2xl font-bold">Pacientes</h1>
      <PatientsDashboard />
    </div>
  );
}

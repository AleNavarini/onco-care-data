'use client';

import TreatmentsWidget from '@/components/dashboards/treatments/TreatmentsWidget';

interface TreatmentsPageProps {
  params: {
    patientId: string;
  };
}

export default function TreatmentsPage({ params }: TreatmentsPageProps) {
  const { patientId } = params;
  return <TreatmentsWidget width={100} patientId={patientId} />;
}

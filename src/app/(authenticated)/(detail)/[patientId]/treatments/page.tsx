'use client';

import TreatmentsWidget from '@/components/dashboards/treatments/treatments-widget';

interface TreatmentsPageProps {
  params: {
    patientId: string;
  };
}

export default function TreatmentsPage({ params }: TreatmentsPageProps) {
  const { patientId } = params;
  return <TreatmentsWidget width={100} patientId={patientId} />;
}

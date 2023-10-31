'use client';

import StudiesWidget from '@/components/Dashboards/Studies/StudiesWidget';

interface StudiesPageProps {
  params: {
    patientId: string;
  };
}

export default function Studies({ params }: StudiesPageProps) {
  const { patientId } = params;
  return <StudiesWidget width={100} patientId={patientId} />;
}

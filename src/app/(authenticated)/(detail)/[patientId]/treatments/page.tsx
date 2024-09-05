'use client';

import AddButton from '@/components/common/add-button';
import StudiesDashboard from '@/components/dashboards/studies/studies-dashboard';
import TreatmentForm from '@/components/forms/treatment-form';

interface TreatmentsPageProps {
  params: {
    patientId: string;
  };
}

export default function TreatmentsPage({ params }: TreatmentsPageProps) {
  const { patientId } = params;
  return (
    <div className="flex flex-col gap-4 items-end w-full">
      <div className="flex justify-between">
        <p>Tratamientos</p>
        <AddButton
          text="Crear Tratamiento"
          form={<TreatmentForm patientId={patientId} />}
        />
      </div>
      {/* <StudiesDashboard patientId={patientId} /> */}
    </div>
  );
}

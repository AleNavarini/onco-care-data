'use client';

import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import CenteredPage from '@/components/ui/centered-page';
import Spinner from '@/components/ui/spinner';
import StatusChip from '@/components/status-chip';

import FollowUpWidget from '@/components/dashboards/follow-ups/follow-up-widget';
import StagingsWidget from '@/components/dashboards/stagings/stagings-widget';
import DiseaseSelect from '@/components/detail/dashboard/disease-select';
import AffiliatoryDataForm from '@/components/forms/affiliatory-data-form';
import SymptomsTable from '@/components/tables/symptoms-table';
import PatientRiskFactorsDashboard from '@/components/dashboards/risk-factors/patient-risk-factors-dashboard';
import GestationForm from '@/components/forms/gestation-form';
import PreviousSurgeriesTable from '@/components/previous-surgeries/previous-surgeries-table';

interface Props {
  params: {
    patientId: string;
  };
}

export default function PatientPage({ params }: Props) {
  const id = params.patientId;
  const { data, error, isLoading } = useSWR(
    `/api/v1/patients/${id}?detailed=true`,
    fetcher,
  );

  if (isLoading || !data || !data.patient) {
    return (
      <CenteredPage>
        <Spinner className="w-20 h-20" />
      </CenteredPage>
    );
  }

  if (error) {
    return (
      <CenteredPage>
        <p>Failed to load patient data. Please try again.</p>
      </CenteredPage>
    );
  }

  const { patient } = data;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-3 p-8">
      <div className="w-full flex col-span-5 justify-between">
        <div className="flex gap-3 justify-center items-center">
          <p>Paciente - {patient.name}</p>
          <StatusChip status={patient.status} />
        </div>

        <DiseaseSelect patient={patient} />
      </div>

      <div className="w-full col-span-3 flex flex-col gap-10">
        <FollowUpWidget patientId={id} />
        <StagingsWidget patientId={id} />
      </div>
      <div className="w-full col-span-2">
        <div className="flex flex-col gap-10">
          <AffiliatoryDataForm patientId={id} />
          <SymptomsTable patientId={id} />
          <PatientRiskFactorsDashboard patientId={id} />
          <GestationForm patientId={id} />
          <PreviousSurgeriesTable patientId={id} />
        </div>
      </div>
    </div>
  );
}

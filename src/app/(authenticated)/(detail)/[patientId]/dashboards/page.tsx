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

interface Props {
  params: {
    patientId: string;
  };
}

export default function PatientPage({ params }: Props) {
  const id = params.patientId;
  const { data, error, isLoading } = useSWR(
    `/api/patients/${id}?detailed=true`,
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
        </div>
      </div>
    </div>
    // <Sheet sx={{ display: 'flex', flexDirection: 'column' }}>
    //   <Box
    //     sx={{
    //       display: 'flex',
    //       flexDirection: { xs: 'column', sm: 'column', md: 'row' },
    //       gap: 3,
    //       mt: 2,
    //     }}
    //   >
    //     <Stack
    //       spacing={2}
    //       sx={{
    //         width: { xs: '100%', sm: '100%', md: '55%', lg: '55%', xl: '70%' },
    //         mb: 2,
    //       }}
    //     >
    //       <Suspense fallback={<LinearProgress />}>
    //         <FollowUpWidget width={100} patientId={id} />
    //       </Suspense>
    //       <Suspense fallback={<LinearProgress />}>
    //         <StagingsWidget width={100} patientId={id} />
    //       </Suspense>
    //     </Stack>
    //     <Stack
    //       spacing={2}
    //       sx={{
    //         width: { xs: '100%', sm: '100%', md: '45%', lg: '45%', xl: '30%' },
    //       }}
    //     >
    //       <Accordion title="Datos Afiliatorios">
    //         <AffiliatoryDataForm
    //           patientId={patient.id}
    //           affiliatoryData={patient.affiliatoryData || {}}
    //         />
    //       </Accordion>
    //       <Accordion title="Sintomas">
    //         <SymptomsTable
    //           patientId={patient.id}
    //           symptoms={patient.symptoms || []}
    //         />
    //       </Accordion>
    //       <Accordion title="Factores de Riesgo">
    //         <PatientRiskFactorsDashboard patientId={id} />
    //       </Accordion>
    //       <Accordion title="Gestas">
    //         <GestationForm
    //           patientId={patient.id}
    //           gestation={patient.gestations || []}
    //         />
    //       </Accordion>
    //       <Accordion title="Cirugias Previas">
    //         <PreviousSurgeriesTable
    //           patientId={patient.id}
    //           previousSurgeries={patient.previousSurgeries || []}
    //         />
    //       </Accordion>
    //     </Stack>
    //   </Box>
    // </Sheet>
  );
}

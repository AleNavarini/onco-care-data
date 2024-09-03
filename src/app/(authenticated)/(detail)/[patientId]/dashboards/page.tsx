'use client';

import { Suspense } from 'react';
import { Box, LinearProgress, Sheet, Stack, Typography } from '@mui/joy';
import useSWR from 'swr';

import Accordion from '@/components/ui/accordion';
import AffiliatoryDataForm from '@/components/forms/affiliatory-data-form';
import PatientTopRow from '@/components/patient-top-row';
import PreviousSurgeriesTable from '@/components/tables/previous-surgeries-table';
import SymptomsTable from '@/components/tables/symptoms-table';
import GestationForm from '@/components/forms/gestation-form';
import FollowUpWidget from '@/components/dashboards/follow-ups/follow-up-widget';
import StagingsWidget from '@/components/dashboards/stagings/stagings-widget';

import fetcher from '@/utils/fetcher';
import CenteredPage from '@/components/ui/centered-page';
import Spinner from '@/components/ui/spinner';
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
        <Typography color="danger">
          Failed to load patient data. Please try again.
        </Typography>
      </CenteredPage>
    );
  }

  const { patient } = data;

  return (
    <Sheet sx={{ display: 'flex', flexDirection: 'column' }}>
      <Suspense fallback={<LinearProgress />}>
        <PatientTopRow patientId={id} />
      </Suspense>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', md: 'row' },
          gap: 3,
          mt: 2,
        }}
      >
        <Stack
          spacing={2}
          sx={{
            width: { xs: '100%', sm: '100%', md: '55%', lg: '55%', xl: '70%' },
            mb: 2,
          }}
        >
          <Suspense fallback={<LinearProgress />}>
            <FollowUpWidget width={100} patientId={id} />
          </Suspense>
          <Suspense fallback={<LinearProgress />}>
            <StagingsWidget width={100} patientId={id} />
          </Suspense>
        </Stack>
        <Stack
          spacing={2}
          sx={{
            width: { xs: '100%', sm: '100%', md: '45%', lg: '45%', xl: '30%' },
          }}
        >
          <Accordion title="Datos Afiliatorios">
            <AffiliatoryDataForm
              patientId={patient.id}
              affiliatoryData={patient.affiliatoryData || {}}
            />
          </Accordion>
          <Accordion title="Sintomas">
            <SymptomsTable
              patientId={patient.id}
              symptoms={patient.symptoms || []}
            />
          </Accordion>
          <Accordion title="Factores de Riesgo">
            <PatientRiskFactorsDashboard patientId={id} />
          </Accordion>
          <Accordion title="Gestas">
            <GestationForm
              patientId={patient.id}
              gestation={patient.gestations || []}
            />
          </Accordion>
          <Accordion title="Cirugias Previas">
            <PreviousSurgeriesTable
              patientId={patient.id}
              previousSurgeries={patient.previousSurgeries || []}
            />
          </Accordion>
        </Stack>
      </Box>
    </Sheet>
  );
}

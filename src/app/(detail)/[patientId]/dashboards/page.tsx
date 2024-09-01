'use client';

import { useState, useEffect, Suspense } from 'react';
import { Box, LinearProgress, Sheet, Stack, Typography } from '@mui/joy';
import useSWR from 'swr';

import Accordion from '@/components/Common/Accordion';
import AffiliatoryDataForm from '@/components/Forms/AffiliatoryDataForm';
import PatientTopRow from '@/components/PatientTopRow';
import RiskFactorsDashboard from '@/components/Dashboards/RiskFactors/RiskFactorsDashboard';
import PreviousSurgeriesTable from '@/components/Tables/PreviousSurgeriesTable';
import SymptomsTable from '@/components/Tables/SymptomsTable';
import GestationForm from '@/components/Forms/GestationForm';
import FollowUpWidget from '@/components/Dashboards/FollowUps/FollowUpWidget';
import StagingsWidget from '@/components/Dashboards/Stagings/StagingsWidget';

import fetcher from '@/utils/fetcher';

interface Props {
  params: {
    patientId: string;
  };
}

export default function PatientPage({ params }: Props) {
  const id = params.patientId;
  const { data, error } = useSWR(`/api/patients/${id}?detailed=true`, fetcher);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data || error) {
      setIsLoading(false);
    }
  }, [data, error]);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (error) {
    return (
      <Typography color="danger">
        Failed to load patient data. Please try again.
      </Typography>
    );
  }

  if (!data || !data.patient) {
    return <Typography>No patient data available.</Typography>;
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
            <RiskFactorsDashboard patientId={id} />
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

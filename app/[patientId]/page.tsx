'use client';

import Accordion from '@/components/Common/Accordion';
import AffiliatoryDataForm from '@/components/Forms/AffiliatoryDataForm';
import PatientTopRow from '@/components/PatientTopRow';
import RiskFactorsDashboard from '@/components/Dashboards/RiskFactors/RiskFactorsDashboard';
import PreviousSurgeriesTable from '@/components/Tables/PreviousSurgeriesTable';
import StagingTable from '@/components/Tables/StagingTable';
import SymptomsTable from '@/components/Tables/SymptomsTable';
import { Box, CircularProgress, LinearProgress, Sheet, Stack } from '@mui/joy';
import useSWR from 'swr';
import FollowUpsTable from '@/components/Tables/FollowUpsTable';
import StudiesTable from '@/components/Tables/StudiesTable';
import GestationForm from '@/components/Forms/GestationForm';
import TreatmentsTable from '@/components/Tables/TreatmentsTable';
import LoadingOverlay from '@/components/Common/LoadingOverlay';
import { Suspense } from 'react';
import fetcher from '@/utils/fetcher';

interface Props {
  params: {
    patientId: string;
  };
}

export default function PatientPage({ params }: Props) {
  const id = params.patientId;
  const { data } = useSWR(`/api/patients/${id}?detailed=true`, fetcher, {
    suspense: true,
  });

  return (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Suspense fallback={<LinearProgress />}>
        <PatientTopRow patientId={id} />
      </Suspense>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row',
          },
          gap: 3,
          mt: 2,
        }}
      >
        <Stack
          spacing={2}
          sx={{
            width: {
              xs: '100%',
              sm: '100%',
              md: '55%',
              lg: '55%',
              xl: '70%',
            },
            mb: 2,
          }}
        >
          <Suspense fallback={<LinearProgress />}>
            <Accordion title="Estadificaciones">
              <StagingTable
                patientId={data?.patient.id}
                stagings={data?.patient.stagings}
              />
            </Accordion>
          </Suspense>

          <Accordion title="Seguimientos">
            <FollowUpsTable
              patientId={data.patient.id}
              followUps={data.patient.followUps}
            />
          </Accordion>
          <Accordion title="Estudios">
            <StudiesTable
              patientId={data.patient.id}
              studies={data.patient.studies}
            />
          </Accordion>

          <Accordion title="Tratamientos">
            <TreatmentsTable
              patientId={data.patient.id}
              treatments={data.patient.treatments}
            />
          </Accordion>
        </Stack>
        <Stack
          spacing={2}
          sx={{
            width: {
              xs: '100%',
              sm: '100%',
              md: '45%',
              lg: '45%',
              xl: '30%',
            },
          }}
        >
          <Accordion title="Datos Afiliatorios">
            <AffiliatoryDataForm
              patientId={data.patient.id}
              affiliatoryData={data.patient.affiliatoryData}
            />
          </Accordion>

          <Accordion title="Sintomas">
            <SymptomsTable
              patientId={data.patient.id}
              symptoms={data.patient.symptoms}
            />
          </Accordion>

          <Accordion title="Factores de Riesgo">
            <RiskFactorsDashboard patientId={id} />
          </Accordion>

          <Accordion title="Gestas">
            <GestationForm
              patientId={data.patient.id}
              gestation={data.patient.gestations}
            />
          </Accordion>

          <Accordion title="Cirugias Previas">
            <PreviousSurgeriesTable
              patientId={data.patient.id}
              previousSurgeries={data.patient.previousSurgeries}
            />
          </Accordion>
        </Stack>
      </Box>
    </Sheet>
  );
}

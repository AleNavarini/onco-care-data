'use client';

import Accordion from '@/components/Common/Accordion';
import AffiliatoryDataForm from '@/components/Forms/AffiliatoryDataForm';
import PatientTopRow from '@/components/PatientTopRow';
import RiskFactorsDashboard from '@/components/Dashboards/RiskFactorsDashboard';
import PreviousSurgeriesTable from '@/components/Tables/PreviousSurgeriesTable';
import StagingTable from '@/components/Tables/StagingTable';
import SymptomsTable from '@/components/Tables/SymptomsTable';
import { Box, LinearProgress, Sheet, Stack } from '@mui/joy';
import useSWR from 'swr';
import FollowUpsTable from '@/components/Tables/FollowUpsTable';
import StudiesTable from '@/components/Tables/StudiesTable';
import GestationForm from '@/components/Forms/GestationForm';
import TreatmentsTable from '@/components/Tables/TreatmentsTable';

interface Props {
  params: {
    patientId: string;
  };
}

const getPatient = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default function PatientPage({ params }: Props) {
  const id = params.patientId;
  const { data, isLoading, error } = useSWR(
    `/api/patients/${id}?detailed=true`,
    getPatient,
    { refreshInterval: 5000 },
  );

  if (error) return <h1>Ha ocurrido un error ... </h1>;
  if (isLoading) return <Sheet
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <LinearProgress />
  </Sheet>

  return (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '95%',
      }}
    >
      <PatientTopRow patient={data?.patient} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row',
          },
          gap: 3,
          width: '90%',
          my: 5,
          mx: 'auto',
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
          <Box
            sx={{
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: 'md',
            }}
          >
            <Accordion title="Estadificaciones">
              <StagingTable
                patientId={data.patient.id}
                stagings={data.patient.stagings}
              />
            </Accordion>
          </Box>
          <Box
            sx={{
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: 'md',
            }}
          >
            <Accordion title="Seguimientos">
              <FollowUpsTable
                patientId={data.patient.id}
                followUps={data.patient.followUps}
              />
            </Accordion>
          </Box>
          <Box
            sx={{
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: 'md',
            }}
          >
            <Accordion title="Estudios">
              <StudiesTable
                patientId={data.patient.id}
                studies={data.patient.studies}
              />
            </Accordion>
          </Box>
          <Box
            sx={{
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: 'md',
            }}
          >
            <Accordion title="Tratamientos">
              <TreatmentsTable
                patientId={data.patient.id}
                treatments={data.patient.treatments}
              />
            </Accordion>
          </Box>
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
          <Box
            sx={{
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: 'md',
              width: '100%',
            }}
          >
            <Accordion title="Datos Afiliatorios">
              <AffiliatoryDataForm
                patientId={data.patient.id}
                affiliatoryData={data.patient.affiliatoryData}
              />
            </Accordion>
          </Box>
          <Box
            sx={{
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: 'md',
            }}
          >
            <Accordion title="Sintomas">
              <SymptomsTable
                patientId={data.patient.id}
                symptoms={data.patient.symptoms}
              />
            </Accordion>
          </Box>
          <Box
            sx={{
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: 'md',
            }}
          >
            <Accordion title="Factores de Riesgo">
              <RiskFactorsDashboard
                forPatient={true}
                riskFactors={data.patient.riskFactors}
                diseaseId={data.patient.dise}
                patientId={data.patient.id}
              />
            </Accordion>
          </Box>
          <Box
            sx={{
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: 'md',
            }}
          >
            <Accordion title="Gestas">
              <GestationForm
                patientId={data.patient.id}
                gestation={data.patient.gestations}
              />
            </Accordion>
          </Box>
          <Box
            sx={{
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: 'md',
            }}
          >
            <Accordion title="Cirugias Previas">
              <PreviousSurgeriesTable
                patientId={data.patient.id}
                previousSurgeries={data.patient.previousSurgeries}
              />
            </Accordion>
          </Box>
        </Stack>
      </Box>
    </Sheet>
  );
}

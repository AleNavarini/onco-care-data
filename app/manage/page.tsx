'use client';
import DiseasesDashboard from '@/components/Dashboards/DiseasesDashboard';
import StudyTypesDasboard from '@/components/Dashboards/StudyTypesDasboard';
import TreatmentTypesDasboard from '@/components/Dashboards/TreatmentTypesDashboard';
import { LinearProgress, Sheet, Typography } from '@mui/joy';
import { Disease } from '@prisma/client';
import useSWR from 'swr';

const fetchData = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default function ManagePage() {
  const {
    data: diseasesData,
    isLoading: diseasesLoading,
    error: diseasesError,
  } = useSWR(`/api/diseases`, fetchData, { refreshInterval: 5000 });
  const {
    data: studyTypesData,
    isLoading: studyTypesLoading,
    error: studyTypesError,
  } = useSWR(`/api/study-types`, fetchData, { refreshInterval: 5000 });
  const {
    data: treatmentTypesData,
    isLoading: treatmentTypesLoading,
    error: treatmentTypesError,
  } = useSWR(`/api/treatment-types`, fetchData, { refreshInterval: 5000 });

  const error = diseasesError || studyTypesError || treatmentTypesError;
  const isLoading =
    diseasesLoading || studyTypesLoading || treatmentTypesLoading;
  if (error) return <h1>Ha ocurrido un error ... </h1>;
  if (isLoading) return <LinearProgress />;

  const filteredDiseases = diseasesData?.diseases?.filter(
    (d: Disease) => d.patientId === null,
  );
  const studyTypes = studyTypesData?.studyTypes;
  const treatmentTypes = treatmentTypesData?.treatmentTypes;
  return (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: {
          sm: 'column',
          md: 'row',
        },
        flexWrap: 'wrap',
        borderRadius: 'md',
        justifyContent: 'space-around',
        gap: 2,
        width: {
          md: '95%',
        },
        mt: 2
      }}
    >
      <Sheet sx={{
        width: {
          sm: '100%',
          md: '30%',
        },

      }}
      >
        <Typography mb={1} level='h3'>Enfermedades</Typography>
        <DiseasesDashboard diseases={filteredDiseases} />
      </Sheet>
      <Sheet
        sx={{
          width: {
            sm: '100%',
            md: '30%',
          },
        }}
      >
        <Typography mb={1} level='h3'>Tratamientos</Typography>
        <TreatmentTypesDasboard treatmentTypes={treatmentTypes} />
      </Sheet>
      <Sheet
        sx={{
          width: {
            sm: '100%',
            md: '30%',
          },
        }}
      >
        <Typography mb={1} level='h3'>Estudios</Typography>
        <StudyTypesDasboard studyTypes={studyTypes} />
      </Sheet>
    </Sheet>
  );
}

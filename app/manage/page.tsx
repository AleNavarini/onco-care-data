'use client';
import AddDiseaseButton from '@/components/Dashboards/Diseases/AddDiseaseButton';
import DiseasesDashboard from '@/components/Dashboards/Diseases/DiseasesDashboard';
import StudyTypesDasboard from '@/components/Dashboards/StudyTypesDasboard';
import AddTreatmentTypeButton from '@/components/Dashboards/TreatmentTypes/AddTreatmentTypeButton';
import TreatmentTypesDasboard from '@/components/Dashboards/TreatmentTypes/TreatmentTypesDashboard';
import fetcher from '@/utils/fetcher';
import { Box, CircularProgress, Sheet, Typography } from '@mui/joy';
import { Suspense } from 'react';
import useSWR from 'swr';

const fetchData = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default function ManagePage() {
  const { data: studyTypesData } = useSWR(`/api/study-types`, fetcher, {
    suspense: true,
  });

  const studyTypes = studyTypesData?.studyTypes;

  return (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: {
          sm: 'column',
          md: 'row',
        },
        justifyContent: 'space-between',
        gap: 3,
      }}
    >
      <Sheet
        sx={{
          width: {
            sm: '100%',
            md: '50%',
          },
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
        }}
      >
        <Suspense fallback={<CircularProgress />}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Typography level="h3">Enfermedades</Typography>
            <AddDiseaseButton />
          </Box>
          <DiseasesDashboard />
        </Suspense>
        <Suspense fallback={<CircularProgress />}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Typography level="h3">Tratamientos</Typography>
            <AddTreatmentTypeButton />
          </Box>
          <TreatmentTypesDasboard />
        </Suspense>
      </Sheet>

      <Sheet
        sx={{
          width: {
            sm: '100%',
            md: '50%',
          },
        }}
      >
        <Suspense fallback={<CircularProgress />}>
          <Typography mb={1} level="h3">
            Estudios
          </Typography>
          <StudyTypesDasboard studyTypes={studyTypes} />
        </Suspense>
      </Sheet>
    </Sheet>
  );
}

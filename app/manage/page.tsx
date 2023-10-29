'use client';
import DiseasesDashboard from '@/components/Dashboards/DiseasesDashboard';
import StudyTypesDasboard from '@/components/Dashboards/StudyTypesDasboard';
import TreatmentTypesDasboard from '@/components/Dashboards/TreatmentTypesDashboard';
import fetcher from '@/utils/fetcher';
import { CircularProgress, LinearProgress, Sheet, Typography } from '@mui/joy';
import { Disease } from '@prisma/client';
import { Suspense } from 'react';
import useSWR from 'swr';

const fetchData = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default function ManagePage() {
  const { data: diseasesData } = useSWR(`/api/diseases`, fetcher, {
    suspense: true,
  });
  const { data: studyTypesData } = useSWR(`/api/study-types`, fetcher, {
    suspense: true,
  });
  const { data: treatmentTypesData } = useSWR(`/api/treatment-types`, fetcher, {
    suspense: true,
  });

  const diseases = diseasesData.diseases;
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
          rowGap: 1,
        }}
      >
        <Suspense fallback={<CircularProgress />}>
          <Typography level="h3">Enfermedades</Typography>
          <DiseasesDashboard diseases={diseases} />
        </Suspense>
        <Suspense fallback={<CircularProgress />}>
          <Typography level="h3">Tratamientos</Typography>
          <TreatmentTypesDasboard treatmentTypes={treatmentTypes} />
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
          <Typography mb={1} level="h3">Estudios</Typography>
          <StudyTypesDasboard studyTypes={studyTypes} />
        </Suspense>
      </Sheet>
    </Sheet>
  );
}

'use client';
import AddDiseaseButton from '@/components/Dashboards/Diseases/AddDiseaseButton';
import DiseasesDashboard from '@/components/Dashboards/Diseases/DiseasesDashboard';
import AddStudyTypeButton from '@/components/Dashboards/StudyTypes/AddStudyTypeButton';
import StudyTypesDashboard from '@/components/Dashboards/StudyTypes/StudyTypesDashboard';

import AddTreatmentTypeButton from '@/components/Dashboards/TreatmentTypes/AddTreatmentTypeButton';
import TreatmentTypesDasboard from '@/components/Dashboards/TreatmentTypes/TreatmentTypesDashboard';
import { Box, CircularProgress, Sheet, Typography } from '@mui/joy';
import { Suspense } from 'react';

export default function ManagePage() {
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="h3">Enfermedades</Typography>
            <AddDiseaseButton />
          </Box>
          <DiseasesDashboard />
        </Suspense>
        <Suspense fallback={<CircularProgress />}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
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
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
        }}
      >
        <Suspense fallback={<CircularProgress />}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="h3">Estudios</Typography>
            <AddStudyTypeButton />
          </Box>
          <StudyTypesDashboard />
        </Suspense>
      </Sheet>
    </Sheet>
  );
}

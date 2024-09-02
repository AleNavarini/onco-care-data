'use client';
import React, { ReactNode, Suspense } from 'react';
import { Box, Sheet, Typography } from '@mui/joy';

import AddDiseaseButton from '@/components/dashboards/Diseases/AddDiseaseButton';
import DiseasesDashboard from '@/components/dashboards/diseases/diseases-dashboard';
import AddStudyTypeButton from '@/components/dashboards/study-types/AddStudyTypeButton';
import StudyTypesDashboard from '@/components/dashboards/study-types/StudyTypesDashboard';
import AddTreatmentTypeButton from '@/components/dashboards/treatment-types/AddTreatmentTypeButton';
import TreatmentTypesDasboard from '@/components/dashboards/treatment-types/TreatmentTypesDashboard';
import CenteredLoading from '@/components/ui/centered-loading';

interface SectionWrapperProps {
  children: ReactNode;
  title: string;
  addButton: ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  title,
  addButton,
}) => (
  <Box
    sx={{
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Typography level="h3">{title}</Typography>
      {addButton}
    </Box>
    <Box sx={{ flexGrow: 1, position: 'relative' }}>
      <Suspense fallback={<CenteredLoading />}>{children}</Suspense>
    </Box>
  </Box>
);

const ManagePage: React.FC = () => {
  return (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        gap: 3,
        height: 'calc(100vh - 100px)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <Sheet
        sx={{
          width: {
            xs: '100%',
            md: '50%',
          },
          minWidth: {
            md: '30vw',
          },
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Box sx={{ height: '50%' }}>
          <SectionWrapper title="Enfermedades" addButton={<AddDiseaseButton />}>
            <Suspense fallback={<CenteredLoading />}>
              <DiseasesDashboard />
            </Suspense>
          </SectionWrapper>
        </Box>
        <Box sx={{ height: '50%' }}>
          <SectionWrapper
            title="Tratamientos"
            addButton={<AddTreatmentTypeButton />}
          >
            <Suspense fallback={<CenteredLoading />}>
              <TreatmentTypesDasboard />
            </Suspense>
          </SectionWrapper>
        </Box>
      </Sheet>

      <Sheet
        sx={{
          width: {
            xs: '100%',
            md: '50%',
          },
          minWidth: {
            md: '50%',
          },
          height: '100%',
        }}
      >
        <SectionWrapper title="Estudios" addButton={<AddStudyTypeButton />}>
          <Suspense fallback={<CenteredLoading />}>
            <StudyTypesDashboard />
          </Suspense>
        </SectionWrapper>
      </Sheet>
    </Sheet>
  );
};

export default ManagePage;

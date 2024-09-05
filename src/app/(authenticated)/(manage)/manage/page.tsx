'use client';
import React, { ReactNode, Suspense } from 'react';
import { Box, Sheet, Typography } from '@mui/joy';

import AddDiseaseButton from '@/components/dashboards/diseases/add-disease-button';
import DiseasesDashboard from '@/components/dashboards/diseases/diseases-dashboard';
import AddStudyTypeButton from '@/components/dashboards/study-types/add-study-type-button';
import StudyTypesDashboard from '@/components/dashboards/study-types/study-types-dashboard';
import AddTreatmentTypeButton from '@/components/dashboards/treatment-types/add-treatment-type-button';
import TreatmentTypesDasboard from '@/components/dashboards/treatment-types/treatment-types-dashboard';
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
  <div className="h-auto w-full flex flex-col">
    <div className="flex justify-between pb-4 items-center">
      <p>{title}</p>
      {addButton}
    </div>
    <div className="flex-grow relative">
      <Suspense fallback={<CenteredLoading />}>{children}</Suspense>
    </div>
  </div>
);

const ManagePage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full p-4">
      <SectionWrapper title="Enfermedades" addButton={<AddDiseaseButton />}>
        <Suspense fallback={<CenteredLoading />}>
          <DiseasesDashboard />
        </Suspense>
      </SectionWrapper>
      <SectionWrapper
        title="Tratamientos"
        addButton={<AddTreatmentTypeButton />}
      >
        <Suspense fallback={<CenteredLoading />}>
          <TreatmentTypesDasboard />
        </Suspense>
      </SectionWrapper>
      <SectionWrapper title="Estudios" addButton={<AddStudyTypeButton />}>
        <Suspense fallback={<CenteredLoading />}>
          <StudyTypesDashboard />
        </Suspense>
      </SectionWrapper>
    </div>
  );
};

export default ManagePage;

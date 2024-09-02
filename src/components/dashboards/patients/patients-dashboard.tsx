'use client';
import { Box, CircularProgress, Sheet, Typography } from '@mui/joy';
import useSWR from 'swr';
import Datagrid from '../../table/datagrid';
import { columns } from './patients.columns';
import fetcher from '@/utils/fetcher';
import AddPatientButton from './add-patient-button';
import { useMemo, useState, useCallback } from 'react';
import { Patient } from '@prisma/client';
import PatientsFilter from './patients-filter';
import { FilterCriteria } from '@/types/filter-criteria';
import CenteredPage from '@/components/ui/centered-page';

interface PatientData {
  patients: Patient[];
}

export default function PatientsDashboard(): JSX.Element {
  const { data: patientData, error } = useSWR<PatientData, Error>(
    '/api/patients',
    fetcher,
  );
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    text: '',
    status: '',
    disease: '',
  });

  const filteredPatients = useMemo(() => {
    if (!patientData) return [];
    const { text, status, disease } = filterCriteria;
    return patientData.patients.filter((patient: Patient) => {
      return (
        (!text ||
          JSON.stringify(patient).toLowerCase().includes(text.toLowerCase())) &&
        (!status || patient.status === status) &&
        (!disease || patient.diseaseId?.toString() === disease)
      );
    });
  }, [patientData, filterCriteria]);

  const handleFilterChange: (newCriteria: FilterCriteria) => void = useCallback(
    (newCriteria: FilterCriteria) => {
      setFilterCriteria(newCriteria);
    },
    [],
  );

  if (error)
    return (
      <CenteredPage>
        <Typography color="danger">Error loading patients</Typography>
      </CenteredPage>
    );
  if (!patientData) {
    return (
      <CenteredPage>
        <CircularProgress />
      </CenteredPage>
    );
  }

  return (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'end',
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          mb: 2,
          alignItems: 'end',
        }}
      >
        <PatientsFilter
          filterCriteria={filterCriteria}
          onFilterChange={handleFilterChange}
        />
        <AddPatientButton />
      </Box>
      <Datagrid rows={filteredPatients} columns={columns} />
    </Sheet>
  );
}

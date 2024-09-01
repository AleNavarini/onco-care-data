'use client';
import { Sheet } from '@mui/joy';
import useSWR from 'swr';
import Datagrid from '../../Table/Datagrid';
import { columns } from './patients.columns';
import fetcher from '@/utils/fetcher';
import AddPatientButton from './AddPatientButton';
import { useMemo, useState, useCallback } from 'react';
import { Patient } from '@prisma/client';
import PatientsFilter, { FilterCriteria } from './PatientsFilter';

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

  const filteredPatients: Patient[] = useMemo(() => {
    if (!patientData) return [];
    return patientData.patients.filter((patient: Patient) => {
      const matchesText: boolean =
        !filterCriteria.text ||
        JSON.stringify(patient)
          .toLowerCase()
          .includes(filterCriteria.text.toLowerCase());
      const matchesStatus: boolean =
        !filterCriteria.status || patient.status === filterCriteria.status;
      const matchesDisease: boolean =
        !filterCriteria.disease || patient.diseaseId?.toString() === filterCriteria.disease;
      return matchesText && matchesStatus && matchesDisease;
    });
  }, [patientData, filterCriteria]);

  const handleFilterChange: (newCriteria: FilterCriteria) => void = useCallback(
    (newCriteria: FilterCriteria) => {
      setFilterCriteria(newCriteria);
    },
    [],
  );

  if (error) return <div>Error loading patients</div>;
  if (!patientData) return <div>Loading...</div>;

  return (
    <>
      <Sheet
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'end',
          gap: 1,
        }}
      >
        <PatientsFilter
          filterCriteria={filterCriteria}
          onFilterChange={handleFilterChange}
        />
        <AddPatientButton />
      </Sheet>
      <Datagrid rows={filteredPatients} columns={columns} />
    </>
  );
}

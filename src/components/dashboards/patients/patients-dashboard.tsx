'use client';
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
import Spinner from '@/components/ui/spinner';

interface PatientData {
  patients: Patient[];
}

export default function PatientsDashboard(): JSX.Element {
  const { data: patientData, error } = useSWR<PatientData, Error>(
    '/api/v1/patients',
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
        (!status || status === 'all' || patient.status === status) &&
        (!disease ||
          disease === 'all' ||
          patient.diseaseId?.toString() === disease)
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
        <p>Error loading patients</p>
      </CenteredPage>
    );
  if (!patientData) {
    return (
      <CenteredPage>
        <Spinner />
      </CenteredPage>
    );
  }

  return (
    <div className="flex flex-col justify-end w-full gap-1">
      <div className="flex flex-col md:flex-row gap-4 py-4 md:justify-between">
        <PatientsFilter
          filterCriteria={filterCriteria}
          onFilterChange={handleFilterChange}
        />
        <AddPatientButton />
      </div>
      <Datagrid rows={filteredPatients} columns={columns} />
    </div>
  );
}

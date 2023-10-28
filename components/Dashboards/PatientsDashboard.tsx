'use client';
import { Sheet } from '@mui/joy';
import useSWR from 'swr';
import Datagrid from '../Table/Datagrid';
import { columns } from './Patients/patients.columns';
import fetcher from '@/utils/fetcher';
import AddPatientButton from './Patients/AddPatientButton';
import { useEffect, useState } from 'react';
import { Patient } from '@prisma/client';
import PatientsFilter from './Patients/PatientsFilter';

export default function PatientsDashboard() {
  const { data: patientData } = useSWR('/api/patients', fetcher, {
    suspense: true,
  });
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);

  useEffect(() => {
    setFilteredPatients(patientData.patients);
  }, [patientData.patients]);

  const handleFilter = (filteredPatients: Patient[]) => {
    setFilteredPatients(filteredPatients);
  };

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
          patients={patientData.patients}
          onFilter={handleFilter}
        />
        <AddPatientButton />
      </Sheet>
      <Datagrid rows={filteredPatients} columns={columns} />
    </>
  );
}

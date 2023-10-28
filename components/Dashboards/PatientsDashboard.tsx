'use client';
import { Sheet } from '@mui/joy';
import useSWR from 'swr';
import Datagrid from '../Table/Datagrid';
import { columns } from './Patients/patients.columns';
import fetcher from '@/utils/fetcher';
import AddPatientButton from './Patients/AddPatientButton';

export default function PatientsDashboard() {
  const { data: patientData } = useSWR('/api/patients', fetcher, {
    suspense: true,
  });
  const patients = patientData.patients;

  return (
    <>
      <AddPatientButton />
      <Sheet
        variant="outlined"
        sx={{
          borderRadius: 'md',
          overflow: 'auto',
          my: 2,
        }}
      >
        <Datagrid rows={patients} columns={columns} />
      </Sheet>
    </>
  );
}

'use client';
import useSWR from 'swr';
import Datagrid from '../../table/datagrid';
import fetcher from '@/utils/fetcher';
import { columns } from './treatment.columns';

interface StudiesDashboardProps {
  patientId: string;
}

export default function StudiesDashboard({ patientId }: StudiesDashboardProps) {
  const { data } = useSWR(`/api/v1/patient-treatments/${patientId}`, fetcher, {
    suspense: true,
  });
  const treatments: any[] = data.treatments;

  return <Datagrid rows={treatments} columns={columns} />;
}

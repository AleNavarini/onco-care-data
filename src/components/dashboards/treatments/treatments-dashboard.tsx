'use client';
import useSWR from 'swr';
import Datagrid from '../../table/datagrid';
import fetcher from '@/utils/fetcher';
import { columns } from './treatment.columns';
import CenteredLoading from '@/components/ui/centered-loading';

interface StudiesDashboardProps {
  patientId: string;
}

export default function StudiesDashboard({ patientId }: StudiesDashboardProps) {
  const { data, isLoading } = useSWR(`/api/v1/patient-treatments/${patientId}`, fetcher);
  if (isLoading) return <CenteredLoading />;

  const treatments: any[] = data.treatments;

  return <Datagrid rows={treatments} columns={columns} />;
}

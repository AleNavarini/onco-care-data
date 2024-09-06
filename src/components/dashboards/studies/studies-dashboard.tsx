'use client';
import useSWR from 'swr';
import Datagrid from '../../table/datagrid';
import fetcher from '@/utils/fetcher';
import { columns } from './study.columns';
import CenteredLoading from '@/components/ui/centered-loading';

interface StudiesDashboardProps {
  patientId: string;
}

export default function StudiesDashboard({ patientId }: StudiesDashboardProps) {
  const { data, isLoading } = useSWR(`/api/v1/patient-studies/${patientId}`, fetcher);

  if (isLoading) return <CenteredLoading />;

  const studies: any[] = data.data;

  return <Datagrid rows={studies} columns={columns} />;
}

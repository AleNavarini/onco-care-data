'use client';
import useSWR from 'swr';
import Datagrid from '../../table/datagrid';
import fetcher from '@/utils/fetcher';
import { columns } from './study.columns';

interface StudiesDashboardProps {
  patientId: string;
}

export default function StudiesDashboard({ patientId }: StudiesDashboardProps) {
  const { data } = useSWR(`/api/v1/patient-studies/${patientId}`, fetcher, {
    suspense: true,
  });
  const studies: any[] = data.data;

  return <Datagrid rows={studies} columns={columns} />;
}

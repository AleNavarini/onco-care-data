'use client';
import useSWR from 'swr';
import Datagrid from '../../table/datagrid';
import fetcher from '@/utils/fetcher';
import { columns } from './study.columns';

interface StudiesDashboardProps {
  patientId: string;
}

export default function StudiesDashboard({ patientId }: StudiesDashboardProps) {
  const { data } = useSWR(`/api/patient-studies/${patientId}`, fetcher, {
    suspense: true,
  });
  const studies: any[] = data.studies;

  return <Datagrid rows={studies} columns={columns} />;
}

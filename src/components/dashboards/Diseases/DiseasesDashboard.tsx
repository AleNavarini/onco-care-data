'use client';
import useSWR from 'swr';
import Datagrid from '../../table/Datagrid';
import { columns } from './disease.columns';
import fetcher from '@/utils/fetcher';

export default function PatientsDashboard() {
  const { data: diseasesData } = useSWR('/api/diseases', fetcher, {
    suspense: true,
  });
  const diseases = diseasesData.diseases;

  return <Datagrid rows={diseases} columns={columns} />;
}

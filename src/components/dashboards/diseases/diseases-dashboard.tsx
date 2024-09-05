'use client';
import useSWR from 'swr';
import Datagrid from '../../table/datagrid';
import { columns } from './disease.columns';
import fetcher from '@/utils/fetcher';

export default function PatientsDashboard() {
  const { data: diseasesData } = useSWR('/api/v1/diseases', fetcher, {
    suspense: true,
  });
  const diseases = diseasesData.diseases;

  return <Datagrid rows={diseases} columns={columns} />;
}

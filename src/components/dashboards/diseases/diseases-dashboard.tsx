'use client';
import useSWR from 'swr';
import Datagrid from '../../table/datagrid';
import { columns } from './disease.columns';
import fetcher from '@/utils/fetcher';
import CenteredLoading from '@/components/ui/centered-loading';
import { Suspense } from 'react';

export default function PatientsDashboard() {
  const { data: diseasesData, isLoading } = useSWR('/api/v1/diseases', fetcher);

  if (isLoading) return <CenteredLoading />;

  const diseases = diseasesData?.diseases;

  return (
    <Suspense fallback={<CenteredLoading />}>
      <Datagrid rows={diseases} columns={columns} />
    </Suspense>
  )
}

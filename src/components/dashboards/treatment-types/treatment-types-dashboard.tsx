'use client';
import useSWR from 'swr';
import Datagrid from '../../table/datagrid';
import { columns } from './treatment-types.columns';
import fetcher from '@/utils/fetcher';
import CenteredLoading from '@/components/ui/centered-loading';

export default function TreatmentTypesDashboard() {
  const { data: treatmentTypesData, isLoading } = useSWR(
    '/api/v1/treatment-types',
    fetcher
  );
  if (isLoading) return <CenteredLoading />;
  const treatmentTypes = treatmentTypesData.treatmentTypes;

  return <Datagrid rows={treatmentTypes} columns={columns} />;
}

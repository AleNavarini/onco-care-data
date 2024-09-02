'use client';
import useSWR from 'swr';
import Datagrid from '../../table/Datagrid';
import { columns } from './treatment-types.columns';
import fetcher from '@/utils/fetcher';

export default function TreatmentTypesDashboard() {
  const { data: treatmentTypesData } = useSWR('/api/treatment-types', fetcher, {
    suspense: true,
  });
  const treatmentTypes = treatmentTypesData.treatmentTypes;

  return <Datagrid rows={treatmentTypes} columns={columns} />;
}

'use client';
import AddTreatmentTypeResultButton from './add-treatment-type-result-button';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';
import Datagrid from '@/components/table/datagrid';
import { columns } from './treatment-type-results.columns';

interface Props {
  treatmentTypeId?: string;
}

export default function TreatmentTypeResultsDashboard({ treatmentTypeId }: Props) {
  const { data } = useSWR(`/api/treatment-types/${treatmentTypeId}/results`, fetcher, {
    suspense: true,
  });
  return (
    <div className='flex flex-col gap-4 items-end'>
      <AddTreatmentTypeResultButton treatmentTypeId={treatmentTypeId} />
      <Datagrid rows={data.data} columns={columns} />
    </div>
  );
}

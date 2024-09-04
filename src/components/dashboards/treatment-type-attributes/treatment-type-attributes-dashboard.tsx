'use client';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { columns } from './treatment-type-attributes.columns';
import Datagrid from '@/components/table/datagrid';
import AddTreatmentTypeAttributeButton from './add-treatment-type-attribute-button';

interface Props {
  treatmentTypeId?: string;
}

export default function TreatmentTypeAttributesDashboard({
  treatmentTypeId,
}: Props) {
  const { data } = useSWR(
    `/api/v1/treatment-types/${treatmentTypeId}/attributes`,
    fetcher,
    {
      suspense: true,
    },
  );

  return (
    <div className="flex flex-col gap-4 items-end">
      <AddTreatmentTypeAttributeButton treatmentTypeId={treatmentTypeId} />
      <Datagrid rows={data.data} columns={columns} />
    </div>
  );
}

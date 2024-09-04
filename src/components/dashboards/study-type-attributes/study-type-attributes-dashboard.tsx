'use client';
import Datagrid from '../../table/datagrid';
import { columns } from './study-type-attributes.columns';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import AddStudyTypeAttributeButton from './add-study-type-attribute-button';

interface Props {
  studyTypeId?: string;
}

export default function StudyTypeAttributesDashboard({ studyTypeId }: Props) {
  const { data } = useSWR(
    `/api/v1/study-types/${studyTypeId}/attributes`,
    fetcher,
    {
      suspense: true,
    },
  );

  return (
    <div className="flex flex-col gap-4 items-end">
      <AddStudyTypeAttributeButton
        key={'add-study-type-attribute-button'}
        studyTypeId={studyTypeId}
      />
      <Datagrid rows={data.data} columns={columns} />
    </div>
  );
}

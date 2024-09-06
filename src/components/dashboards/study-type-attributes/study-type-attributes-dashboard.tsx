'use client';
import Datagrid from '../../table/datagrid';
import { columns } from './study-type-attributes.columns';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import AddStudyTypeAttributeButton from './add-study-type-attribute-button';
import CenteredLoading from '@/components/ui/centered-loading';

interface Props {
  studyTypeId?: string;
}

export default function StudyTypeAttributesDashboard({ studyTypeId }: Props) {
  const { data, isLoading } = useSWR(
    `/api/v1/study-types/${studyTypeId}/attributes`,
    fetcher
  );
  if (isLoading) return <CenteredLoading />;

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

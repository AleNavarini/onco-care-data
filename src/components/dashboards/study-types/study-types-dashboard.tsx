'use client';
import useSWR from 'swr';
import Datagrid from '../../table/datagrid';
import { columns } from './study-type.columns';
import fetcher from '@/utils/fetcher';
import CenteredLoading from '@/components/ui/centered-loading';

export default function StudyTypesDashboard() {
  const { data: studyTypesData, isLoading } = useSWR('/api/v1/study-types', fetcher);

  if (isLoading) return <CenteredLoading />;

  const studyTypes = studyTypesData.studyTypes;

  return <Datagrid rows={studyTypes} columns={columns} />;
}

'use client';
import useSWR from 'swr';
import Datagrid from '../../table/datagrid';
import { columns } from './study-type.columns';
import fetcher from '@/utils/fetcher';

export default function StudyTypesDashboard() {
  const { data: studyTypesData } = useSWR('api/study-types', fetcher, {
    suspense: true,
  });
  const studyTypes = studyTypesData.studyTypes;

  return <Datagrid rows={studyTypes} columns={columns} />;
}

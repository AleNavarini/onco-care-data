'use client';
import useSWR from 'swr';
import Datagrid from '../../Table/Datagrid';

import fetcher from '@/utils/fetcher';
import { columns } from './study-type-attributes.columns';
import { LinearProgress, Sheet, Table } from '@mui/joy';
import TableHead from '@/components/Table/TableHead';
import TableBody from '@/components/Table/TableBody';
import TableRow from '@/components/Table/TableRow';
import { StudyPayload } from '@prisma/client';
import { ColumnType } from '@/components/Table/table.types';
import { Suspense, useEffect, useState } from 'react';

interface StudiesDashboardProps {
  patientId: string;
}

export default function StudiesDashboard({ patientId }: StudiesDashboardProps) {
  const { data } = useSWR(`/api/patient-studies/${patientId}`, fetcher, {
    suspense: true,
  });
  const studies: any[] = data.studies;

  const [selectedStudy, setSelectedStudy] = useState(studies[0]);

  useEffect(() => {
    setSelectedStudy(studies[0]);
  }, [studies]);
  return (
    <>
      <Datagrid rows={studies} columns={columns} />
      <pre>{JSON.stringify(studies, null, 2)}</pre>
    </>
  );
}

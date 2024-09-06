'use client';
import useSWR from 'swr';
import Datagrid from '../../table/datagrid';

import fetcher from '@/utils/fetcher';
import { columns } from './staging.columns';
import CenteredLoading from '@/components/ui/centered-loading';
import { Suspense } from 'react';

interface FollowUpsDashboardProps {
  patientId: string;
}

export default function StagingsDashboard({
  patientId,
}: FollowUpsDashboardProps) {
  const { data } = useSWR(`/api/v1/patient-stagings/${patientId}`, fetcher);
  const stagings = data?.stagings;

  return (
    <Suspense fallback={<CenteredLoading />}>
      <Datagrid rows={stagings} columns={columns} />
    </Suspense>
  )
}

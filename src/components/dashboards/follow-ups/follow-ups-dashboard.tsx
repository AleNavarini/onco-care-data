'use client';
import useSWR from 'swr';
import Datagrid from '../../table/datagrid';

import fetcher from '@/utils/fetcher';
import { columns } from './follow-up.columns';
import CenteredLoading from '@/components/ui/centered-loading';
import { Suspense } from 'react';

interface FollowUpsDashboardProps {
  patientId: string;
}

export default function FollowUpsDashboard({
  patientId,
}: FollowUpsDashboardProps) {
  const { data } = useSWR(`/api/v1/patient-follow-ups/${patientId}`, fetcher);
  const followUps = data?.followUps;

  return (
    <Suspense fallback={<CenteredLoading />}>
      <Datagrid rows={followUps} columns={columns} />
    </Suspense>
  )
}

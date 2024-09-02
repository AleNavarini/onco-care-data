'use client';
import useSWR from 'swr';
import Datagrid from '../../table/Datagrid';

import fetcher from '@/utils/fetcher';
import { columns } from './follow-up.columns';

interface FollowUpsDashboardProps {
  patientId: string;
}

export default function FollowUpsDashboard({
  patientId,
}: FollowUpsDashboardProps) {
  const { data } = useSWR(`/api/patient-follow-ups/${patientId}`, fetcher, {
    suspense: true,
  });
  const followUps = data.followUps;

  return <Datagrid rows={followUps} columns={columns} />;
}

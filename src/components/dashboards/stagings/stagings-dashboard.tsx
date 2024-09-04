'use client';
import useSWR from 'swr';
import Datagrid from '../../table/datagrid';

import fetcher from '@/utils/fetcher';
import { columns } from './staging.columns';

interface FollowUpsDashboardProps {
  patientId: string;
}

export default function StagingsDashboard({
  patientId,
}: FollowUpsDashboardProps) {
  const { data } = useSWR(`/api/v1/patient-stagings/${patientId}`, fetcher, {
    suspense: true,
  });
  const stagings = data.stagings;

  return <Datagrid rows={stagings} columns={columns} />;
}

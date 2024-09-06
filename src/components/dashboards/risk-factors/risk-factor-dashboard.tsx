'use client';
import { RiskFactor } from '@prisma/client';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import Datagrid from '@/components/table/datagrid';
import AddRiskFactorButton from './add-risk-factor-button';
import { columns } from './risk-factor.columns';
import CenteredLoading from '@/components/ui/centered-loading';
import { Suspense } from 'react';

interface Props {
  diseaseId: string;
}

export default function RiskFactorsDashboard({ diseaseId }: Props) {
  const { data } = useSWR(
    `/api/v1/diseases/${diseaseId}/risk-factors`,
    fetcher
  );
  const riskFactors = data?.data;
  return (
    <div className="w-full flex flex-col gap-4 p-4 items-end">
      <div className="w-max">
        <AddRiskFactorButton diseaseId={diseaseId} />
      </div>
      <Suspense fallback={<CenteredLoading />}>
        <Datagrid rows={riskFactors} columns={columns} />
      </Suspense>
    </div>
  );
}

'use client';
import { RiskFactor } from '@prisma/client';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import Datagrid from '@/components/table/datagrid';
import AddRiskFactorButton from './add-risk-factor-button';
import { columns } from './risk-factor.columns';

interface Props {
  diseaseId: string;
}

export default function RiskFactorsDashboard({ diseaseId }: Props) {
  const { data } = useSWR(`/api/diseases/${diseaseId}/risk-factors`, fetcher, {
    suspense: true,
  });
  const riskFactors = data.data;
  return (
    <div className="w-full flex flex-col gap-4 p-4 items-end">
      <div className="w-max">
        <AddRiskFactorButton diseaseId={diseaseId} />
      </div>
      <Datagrid rows={riskFactors} columns={columns} />
    </div>
  );
}

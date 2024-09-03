'use client';
import { RiskFactor } from '@prisma/client';
import { columns } from './risk-factors/risk-factor.columns';
import Datagrid from '../table/datagrid';
import AddRiskFactorButton from './risk-factors/add-risk-factor-button';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';

interface Props {
  diseaseId: string;
  patientId?: string;
}

export default function RiskFactorsDashboard({ diseaseId }: Props) {
  const { data } = useSWR(`/api/diseases/${diseaseId}/risk-factors`, fetcher, {
    suspense: true,
  });

  const riskFactors = data.data;
  return (
    <div className="w-full flex flex-col gap-4 p-4 items-end">
      <div className="w-max">
        <AddRiskFactorButton />
      </div>
      <Datagrid rows={riskFactors} columns={columns} />
    </div>
  );
}

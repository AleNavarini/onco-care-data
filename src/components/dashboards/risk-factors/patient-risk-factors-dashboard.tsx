'use client';
import useSWR from 'swr';
import Datagrid from '../../table/datagrid';
import fetcher from '@/utils/fetcher';
import { columns } from './patient-risk-factor.columns';

interface RiskFactorsDashboardProps {
  patientId: string;
}

export default function PatientRiskFactorsDashboard({
  patientId,
}: RiskFactorsDashboardProps) {
  const { data: riskFactorsData } = useSWR(
    `/api/v1/patient-risk-factors/${patientId}`,
    fetcher,
    {
      suspense: true,
    },
  );
  const riskFactors = riskFactorsData.riskFactors;
  return (
    <div className="flex flex-col gap-4 items-start">
      <p>Factores de Riesgo</p>
      <Datagrid rows={riskFactors} columns={columns} />;
    </div>
  );
}

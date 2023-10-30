'use client';
import useSWR from 'swr';
import Datagrid from '../../Table/Datagrid';
import fetcher from '@/utils/fetcher';
import { getColumns } from './risk-factor.columns';

interface RiskFactorsDashboardProps {
  patientId: string;
}
export default function RiskFactorsDashboard({
  patientId,
}: RiskFactorsDashboardProps) {
  const { data: riskFactorsData } = useSWR(
    `/api/patient-risk-factors/${patientId}`,
    fetcher,
    {
      suspense: true,
    },
  );
  const riskFactors = riskFactorsData.riskFactors;
  const columns = getColumns(true);
  return <Datagrid rows={riskFactors} columns={columns} />;
}

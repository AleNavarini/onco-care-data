'use client';
import useSWR from 'swr';
import Datagrid from '../../table/datagrid';
import fetcher from '@/utils/fetcher';
import { columns } from './patient-risk-factor.columns';
import CenteredLoading from '@/components/ui/centered-loading';
import { Suspense } from 'react';

interface RiskFactorsDashboardProps {
  patientId: string;
}

export default function PatientRiskFactorsDashboard({
  patientId,
}: RiskFactorsDashboardProps) {
  const { data: riskFactorsData, isLoading } = useSWR(
    `/api/v1/patient-risk-factors/${patientId}`,
    fetcher
  );
  if (isLoading) return <CenteredLoading />;

  const riskFactors = riskFactorsData?.riskFactors;
  return (
    <Suspense fallback={<CenteredLoading />}>
      <Datagrid rows={riskFactors} columns={columns} />
    </Suspense>
  )
}

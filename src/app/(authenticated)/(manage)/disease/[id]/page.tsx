'use client';

import RiskFactorsDashboard from '@/components/dashboards/risk-factors/risk-factor-dashboard';

interface Props {
  params: {
    id: string;
  };
}

export default function DiseasePage({ params }: Props) {
  return (
    <div className="flex flex-col justify-center items-center gap-6 py-10">
      <h2 className="text-2xl font-bold">Factores de riesgo</h2>
      <RiskFactorsDashboard diseaseId={params.id} />
    </div>
  );
}

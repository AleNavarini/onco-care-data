import RiskFactorsDashboard from '@/components/dashboards/risk-factors/risk-factor-dashboard';
import prisma from '@/lib/prisma';

interface Props {
  params: { id: string };
}

export default async function DiseasePage({ params }: Props) {
  const { id } = params;
  const disease = await prisma.disease.findUnique({
    where: {
      id: BigInt(id),
    },
    select: {
      id: true,
      name: true,
    },
  });
  return (
    <div className="flex flex-col justify-center items-center gap-6 py-10">
      <h2 className="text-2xl font-bold">
        Factores de riesgo - {disease.name}
      </h2>
      <RiskFactorsDashboard diseaseId={disease.id.toString()} />
    </div>
  );
}

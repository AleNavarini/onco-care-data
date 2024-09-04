import TreatmentTypeAttributesDashboard from '@/components/dashboards/treatment-type-attributes/treatment-type-attributes-dashboard';

interface Props {
  params: {
    id: string;
  };
}

export default async function TreatmentTypePage({ params }: Props) {
  const id = params.id;
  const treatmentType = await prisma.treatmentType.findUnique({
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
        Tipo de tratamiento - {treatmentType.name}
      </h2>
      <TreatmentTypeAttributesDashboard treatmentTypeId={id} />
      {/* <TreatmentTypeResultsDashboard forPatient={false} treatmentTypeId={id} /> */}
    </div>
  );
}

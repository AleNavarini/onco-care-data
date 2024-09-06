import StudyTypeAttributesDashboard from '@/components/dashboards/study-type-attributes/study-type-attributes-dashboard';
import prisma from '@/lib/prisma';

interface Props {
  params: { id: string };
}

export default async function StudyTypePage({ params }: Props) {
  const { id } = params;
  const studyType = await prisma.studyType.findUnique({
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
      <h2 className="text-2xl font-bold">Tipo de estudio - {studyType.name}</h2>
      <StudyTypeAttributesDashboard studyTypeId={studyType.id.toString()} />
    </div>
  );
}

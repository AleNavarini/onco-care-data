import '@/lib/big-int-extensions';
import { Study, StudyType, StudyTypeAttribute } from '@prisma/client';
import { z } from 'zod';
import ZodForm from './zod-form/zod-form';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';

interface Props {
  patientId: string;
  oldStudy?: Study & {
    studyType: StudyType;
    studyTypeAttributes: StudyTypeAttribute[];
  };
  studyType?: StudyType & Partial<{ attributes: StudyTypeAttribute[] }>;
  closeModal?: () => void;
}

export default function StudyForm({
  patientId,
  oldStudy,
  studyType,
  closeModal,
}: Props) {
  const { data: fetchedAttributesData } = useSWR(
    `/api/v2/study-types/${studyType.id}/attributes`,
    fetcher,
    {
      suspense: true,
    },
  );

  // Fetched attributes for the studyType
  const fetchedAttributes: StudyTypeAttribute[] =
    fetchedAttributesData?.data || [];

  // Merge fetched attributes with oldStudy attributes
  const fullAttributesList = fetchedAttributes.reduce(
    (acc, attribute) => {
      const existingAttribute = oldStudy?.studyTypeAttributes.find(
        (attr) => attr.name === attribute.name,
      );
      acc[attribute.name] = existingAttribute?.value || ''; // Keep old value if present, else empty
      return acc;
    },
    {} as Record<string, string>,
  );

  const endpoint = `/v2/patients/${patientId}/studies`;
  const baseSchema = z.object({
    id: z.string().describe('Id').optional(),
    date: z.string().describe('Fecha').optional(),
    patientId: z.bigint().describe('Id del paciente').optional(),
    studyTypeId: z.bigint().describe('Id del tipo de estudio').optional(),
  });

  // Create a schema with the full list of attributes
  const dynamicAttributesSchema = fetchedAttributes.reduce(
    (acc, attribute) => {
      acc[attribute.name] = z
        .string()
        .optional()
        .describe(`Atributo : ${attribute.name}`);
      return acc;
    },
    {} as Record<string, z.ZodTypeAny>,
  );

  const extendedFormSchema = baseSchema.extend(dynamicAttributesSchema);

  const date = oldStudy?.date
    ? new Date(oldStudy.date).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];

  // Prepare the final entity with merged attribute values
  const entity = {
    ...oldStudy,
    patientId: oldStudy ? BigInt(oldStudy.patientId) : BigInt(patientId),
    studyTypeId: BigInt(studyType?.id || ''),
    date: date,
    ...fullAttributesList, // Merged attributes
  };

  return (
    <ZodForm
      key={'study-form'}
      formSchema={extendedFormSchema}
      hiddenFields={['id', 'patientId', 'studyTypeId']}
      endpoint={endpoint}
      entity={entity}
      closeModal={closeModal}
      customMutate={`/api/v1/patient-studies/${patientId}`}
    />
  );
}

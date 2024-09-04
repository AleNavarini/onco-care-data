import { StudyTypeAttribute } from '@prisma/client';
import { z } from 'zod';
import ZodForm from './zod-form/zod-form';

interface Props {
  studyTypeId?: string;
  studyId?: string;
  entity?: StudyTypeAttribute;
  closeModal: (state: boolean) => void;
  customMutate?: string;
}

export default function StudyTypeAttributeForm({
  entity,
  closeModal,
  studyTypeId,
  studyId,
  customMutate,
}: Props) {
  const endpoint = entity ? `study-types-attributes/` : `study-types/${studyTypeId}/attributes`;
  let formSchema = z.object({
    id: z.string().describe('Id').optional(),
    name: z.string().describe('Nombre'),
  });

  if (entity) {
    formSchema = formSchema.extend({
      studyTypeId: z.string().describe('Id del tipo de estudio').optional(),
    });
  }

  if (studyId) {
    formSchema = formSchema.extend({
      studyId: z.bigint().describe('Id del estudio').optional(),
      value: z.string().describe('Valor del factor de riesgo'),
    });
  }

  const hiddenFields = ['id', 'studyId', 'studyTypeId'];

  return (
    <ZodForm
      key={'study-type-attribute-form'}
      formSchema={formSchema}
      hiddenFields={hiddenFields}
      endpoint={endpoint}
      entity={entity}
      closeModal={closeModal}
      customMutate={customMutate}
    />
  );
}

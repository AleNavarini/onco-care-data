import { TreatmentTypeAttribute } from '@prisma/client';
import { z } from 'zod';
import ZodForm from './zod-form/zod-form';

interface Props {
  entity?: TreatmentTypeAttribute;
  treatmentTypeId?: string;
  treatmentId?: string;
  closeModal: (state: boolean) => void;
  customMutate?: string;
}

export default function TreatmentTypeAttributeForm({
  entity,
  closeModal,
  treatmentId,
  treatmentTypeId,
  customMutate,
}: Props) {
  const endpoint = entity
    ? `treatment-types-attributes/`
    : `treatment-types/${treatmentTypeId}/attributes`;
  let formSchema = z.object({
    id: z.string().describe('Id').optional(),
    name: z.string().describe('Nombre'),
  });

  if (entity) {
    formSchema = formSchema.extend({
      treatmentTypeId: z
        .string()
        .describe('Id del tipo de tratamiento')
        .optional(),
    });
  }

  if (treatmentId) {
    formSchema = formSchema.extend({
      treatmentId: z.bigint().describe('Id del tratamiento').optional(),
      value: z.string().describe('Valor del factor de riesgo'),
    });
  }

  const hiddenFields = ['id', 'treatmentTypeId', 'treatmentId'];

  return (
    <ZodForm
      key={'treatment-type-attribute-form'}
      formSchema={formSchema}
      hiddenFields={hiddenFields}
      endpoint={endpoint}
      entity={entity}
      closeModal={closeModal}
      customMutate={customMutate}
    />
  );
}

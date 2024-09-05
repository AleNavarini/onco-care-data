import { TreatmentTypeResult } from '@prisma/client';
import { z } from 'zod';
import ZodForm from './zod-form/zod-form';

interface Props {
  entity?: TreatmentTypeResult;
  closeModal: (state: boolean) => void;
  treatmentTypeId?: string;
  treatmentId?: string;
  customMutate?: string;
}

export default function TreatmentTypeResultForm({
  entity,
  closeModal,
  treatmentTypeId,
  customMutate,
  treatmentId,
}: Props) {
  const endpoint = entity
    ? `treatment-types-results/`
    : `treatment-types/${treatmentTypeId}/results`;

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
      value: z.string().describe('Valor'),
    });
  }

  const hiddenFields = ['id', 'treatmentTypeId', 'treatmentId'];
  return (
    <ZodForm
      key={'treatment-type-result-form'}
      formSchema={formSchema}
      hiddenFields={hiddenFields}
      endpoint={endpoint}
      entity={entity}
      closeModal={closeModal}
      customMutate={customMutate}
    />
  );
}

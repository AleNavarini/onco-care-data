import { TreatmentType } from '@prisma/client';
import { z } from 'zod';
import ZodForm from './zod-form/zod-form';

interface Props {
  oldTreatmentType?: TreatmentType;
  closeModal: (state: boolean) => void;
}

export default function TreatmentTypeForm({
  closeModal,
  oldTreatmentType,
}: Props) {
  const hiddenFields = ['id'];
  const formSchema = z.object({
    id: z.string().describe('Id').optional(),
    name: z.string().describe('Nombre'),
  });

  return (
    <ZodForm
      key={'treatment-type-form'}
      formSchema={formSchema}
      hiddenFields={hiddenFields}
      endpoint="treatment-types"
      entity={oldTreatmentType}
      closeModal={closeModal}
    />
  );
}

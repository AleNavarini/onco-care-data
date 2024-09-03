import { TreatmentType } from '@prisma/client';
import { FieldConfig } from '@/types/field-config';
import { z } from 'zod';
import ZodForm from './ZodForm';

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

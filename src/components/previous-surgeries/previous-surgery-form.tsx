import { useForm } from 'react-hook-form';
import { PreviousSurgery } from '@prisma/client';
import { FieldConfig } from '@/types/field-config';
import Form from '../common/form';
import { useSubmitForm } from '@/hooks/use-submit-form';
import { z } from 'zod';
import ZodForm from '../forms/zod-form/zod-form';

interface Props {
  oldEntity?: PreviousSurgery;
  patientId: string;
  closeModal?: () => void;
  customMutate?: string;
}

export default function PreviousSurgeryForm({
  oldEntity,
  patientId,
  closeModal,
  customMutate,
}: Props) {
  const endpoint = '/v1/previous-surgeries';
  const formSchema = z.object({
    id: z.string().describe('Id').optional(),
    patientId: z.bigint().describe('Id del paciente').optional(),
    surgeryType: z.string().describe('Tipo de cirguia').optional(),
    observations: z.string().describe('Observaciones').optional(),
  });

  const entity = {
    ...oldEntity,
    patientId: oldEntity ? BigInt(oldEntity.patientId) : BigInt(patientId),
  };

  return (
    <ZodForm
      key={'previous-surgery-form'}
      formSchema={formSchema}
      hiddenFields={['id', 'patientId']}
      endpoint={endpoint}
      entity={entity}
      closeModal={closeModal}
      customMutate={customMutate}
    />
  );
}

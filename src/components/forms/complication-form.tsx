import { useForm } from 'react-hook-form';
import { Complication } from '@prisma/client';
import { FieldConfig } from '@/types/field-config';
import Form from '../common/form';
import { useSubmitForm } from '@/hooks/use-submit-form';
import { z } from 'zod';
import ZodForm from './zod-form/zod-form';

interface Props {
  oldComplication?: Complication;
  treatmentId?: string;
  closeModal?: () => void;
}

export default function ComplicationForm({
  oldComplication,
  treatmentId,
  closeModal,
}: Props) {
  const endpoint = `/v2/treatments/${treatmentId}/complications`;
  const baseSchema = z.object({
    id: z.string().describe('Id').optional(),
    time: z.string().describe('Tiempo').optional(),
    type: z.string().describe('Tipo').optional(),
    transfusions: z.string().describe('Transfusiones').optional(),
    patientId: z.bigint().describe('Id del paciente').optional(),
    treatmentId: z.bigint().describe('Id del tratamiento').optional(),
  });

  const entity = {
    ...oldComplication,
    treatmentId: oldComplication
      ? BigInt(oldComplication.treatmentId)
      : BigInt(treatmentId),
  };

  return (
    <ZodForm
      key={'complication-form'}
      formSchema={baseSchema}
      hiddenFields={['id', 'patientId', 'treatmentId']}
      endpoint={endpoint}
      entity={entity}
      closeModal={closeModal}
      customMutate={`/api/v2/treatments/${treatmentId}/complications`}
    />
  );
}

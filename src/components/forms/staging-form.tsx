import { useForm } from 'react-hook-form';
import { Staging } from '@prisma/client';
import { FieldConfig } from '@/types/field-config';
import { useSubmitForm } from '@/hooks/use-submit-form';
import NewForm from '../common/new-form';
import { z } from 'zod';
import ZodForm from './zod-form/zod-form';

interface Props {
  oldStaging?: Staging;
  patientId: string;
  closeModal?: () => void;
}

export default function StagingForm({
  patientId,
  closeModal,
  oldStaging,
}: Props) {
  const endpoint = 'stagings';
  const formSchema = z.object({
    id: z.string().describe('Id').optional(),
    date: z.string().date().describe('Fecha').optional(),
    type: z.string().describe('Tipo').optional(),
    figo: z.string().describe('FIGO').optional(),
    patientId: z.bigint().describe('Id del paciente').optional(),
  });

  const date = oldStaging?.date
    ? new Date(oldStaging.date).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];

  const entity = {
    ...oldStaging,
    patientId: oldStaging ? BigInt(oldStaging.patientId) : BigInt(patientId),
    date: date,
  };

  const hiddenFields = ['id', 'patientId'];
  return (
    <ZodForm
      key={'staging-form'}
      formSchema={formSchema}
      hiddenFields={hiddenFields}
      endpoint={endpoint}
      entity={entity}
      closeModal={closeModal}
      customMutate={`/api/v1/patient-stagings/${patientId}`}
    />
  );
}

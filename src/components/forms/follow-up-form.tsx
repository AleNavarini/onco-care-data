import { FollowUp } from '@prisma/client';
import { z } from 'zod';
import ZodForm from './zod-form/zod-form';

interface FollowUpFormProps {
  oldFollowUp?: FollowUp;
  patientId: string;
  closeModal?: () => void;
}

export default function FollowUpForm({
  oldFollowUp,
  patientId,
  closeModal,
}: FollowUpFormProps) {
  const endpoint = 'follow-ups';
  const formSchema = z.object({
    id: z.string().describe('Id').optional(),
    date: z.string().date().describe('Fecha'),
    attended: z.enum(['true', 'false']).describe('Se presentó').optional(),
    hasDisease: z
      .enum(['true', 'false'])
      .describe('Tiene enfermedad')
      .optional(),
    recurrenceSite: z.string().describe('Sitio de recidiva').optional(),
    died: z.enum(['true', 'false']).describe('Murio').optional(),
    causeOfDeath: z.string().describe('Causa de muerte').optional(),
    observations: z.string().describe('Observaciones').optional(),
    patientId: z.bigint().describe('Id del paciente').optional(),
  });

  const date = oldFollowUp?.date
    ? new Date(oldFollowUp.date).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];

  if (oldFollowUp) {
    Object.keys(oldFollowUp).forEach((key) => {
      if (typeof oldFollowUp[key] === 'boolean') {
        oldFollowUp[key] = String(oldFollowUp[key]);
      }
    });
  }

  const entity = {
    ...oldFollowUp,
    patientId: oldFollowUp ? BigInt(oldFollowUp.patientId) : BigInt(patientId),
    date: date,
  };

  return (
    <ZodForm
      key={'follow-up-form'}
      formSchema={formSchema}
      hiddenFields={['id', 'patientId']}
      endpoint={endpoint}
      entity={entity}
      closeModal={closeModal}
      customMutate={`/api/v1/patient-follow-ups/${patientId}`}
    />
  );
}

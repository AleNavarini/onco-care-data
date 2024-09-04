import { FormControl, FormLabel, Radio, RadioGroup, Stack } from '@mui/joy';
import { useForm } from 'react-hook-form';
import Field from './field';
import { FollowUp } from '@prisma/client';
import SubmitButton from '../common/submit-button';
import { useSubmitForm } from '@/hooks/use-submit-form';
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
    attended: z.boolean().describe('Se presentó').optional(),
    hasDisease: z.boolean().describe('Tiene enfermedad').optional(),
    recurrenceSite: z.string().describe('Sitio de recidiva').optional(),
    died: z.boolean().describe('Murio').optional(),
    causeOfDeath: z.string().describe('Causa de muerte').optional(),
    observations: z.string().describe('Observaciones').optional(),
  });

  const entity = oldFollowUp || {
    date: new Date().toISOString().split('T')[0],
  };
  return (
    <ZodForm
      key={'follow-up-form'}
      formSchema={formSchema}
      hiddenFields={['id']}
      endpoint={endpoint}
      entity={entity}
      closeModal={closeModal}
    />
  );
}

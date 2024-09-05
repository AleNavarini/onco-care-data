import { Symptom } from '@prisma/client';
import { z } from 'zod';
import ZodForm from './zod-form/zod-form';

interface Props {
  oldSymptom?: Symptom;
  patientId: string;
  closeModal?: () => void;
  customMutate?: string;
}

export default function SymptomForm({
  patientId,
  closeModal,
  oldSymptom,
  customMutate,
}: Props) {
  const endpoint = 'symptoms';
  const formSchema = z.object({
    id: z.string().describe('Id').optional(),
    name: z.string().describe('Nombre'),
    value: z.string().describe('Valor'),
    patientId: z.bigint().describe('Id del paciente').optional(),
  });

  const entity = {
    ...oldSymptom,
    patientId: oldSymptom ? BigInt(oldSymptom.patientId) : BigInt(patientId),
  };

  const hiddenFields = ['id', 'patientId'];
  return (
    <ZodForm
      key={'symptom-form'}
      formSchema={formSchema}
      hiddenFields={hiddenFields}
      endpoint={endpoint}
      entity={entity}
      closeModal={closeModal}
      customMutate={customMutate}
    />
  );
}

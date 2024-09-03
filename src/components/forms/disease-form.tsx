import { Disease } from '@prisma/client';
import { z } from 'zod';
import ZodForm from './zod-form/zod-form';

interface Props {
  oldDisease?: Disease;
  closeModal: (state: boolean) => void;
}

export default function DiseaseForm({ oldDisease, closeModal }: Props) {
  const hiddenFields = ['id'];
  const formSchema = z.object({
    id: z.string().describe('Id').optional(),
    name: z.string().describe('Nombre'),
  });
  return (
    <ZodForm
      key={'disease-form'}
      formSchema={formSchema}
      hiddenFields={hiddenFields}
      endpoint="diseases"
      entity={oldDisease}
      closeModal={closeModal}
    />
  );
}

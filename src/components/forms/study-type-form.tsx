import { StudyType } from '@prisma/client';
import ZodForm from './ZodForm';
import { z } from 'zod';

interface Props {
  oldStudyType?: StudyType;
  closeModal: (state: boolean) => void;
}

export default function StudyTypeForm({ closeModal, oldStudyType }: Props) {
  const formSchema = z.object({
    id: z.string().describe('Id del estudio').optional(),
    name: z.string().describe('Nombre del estudio'),
  });
  const hiddenFields = ['id'];

  return (
    <ZodForm
      key={'study-type-form'}
      formSchema={formSchema}
      hiddenFields={hiddenFields}
      endpoint="study-types"
      entity={oldStudyType}
      closeModal={closeModal}
    />
  );
}

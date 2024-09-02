import { useForm } from 'react-hook-form';
import { StudyType } from '@prisma/client';
import { FieldConfig } from '@/types/FieldConfig';
import { useSubmitForm } from '@/hooks/useSubmitForm';
import NewForm from '../common/new-form';

interface Props {
  oldStudyType?: StudyType;
  handler?: (studyType: StudyType) => void;
  setModalOpen: (state: boolean) => void;
}

export default function StudyTypeForm({
  setModalOpen,
  handler,
  oldStudyType,
}: Props) {
  const { register, handleSubmit, reset } = useForm();
  const fields = getFields(oldStudyType);

  const { onSubmit, isLoading } = useSubmitForm({
    entity: 'study-types',
    oldEntity: oldStudyType,
    returnEntity: 'studyType',
    reset,
    setModalOpen,
    handler,
  });

  return (
    <NewForm
      fields={fields}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      onSubmit={onSubmit}
      register={register}
      oldEntity={oldStudyType}
    />
  );
}

function getFields(oldStudyType: StudyType | undefined): FieldConfig[] {
  return [
    {
      fieldName: 'id',
      label: 'ID',
      placeholder: 'Id del tipo de estudio',
      type: 'text',
      visible: false,
      defaultValue: oldStudyType?.id,
    },
    {
      fieldName: 'name',
      label: 'Nombre',
      placeholder: 'Nombre del tipo de estudio',
      type: 'text',
      required: true,
      defaultValue: oldStudyType?.name,
    },
  ];
}

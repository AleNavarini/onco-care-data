import { useForm } from 'react-hook-form';
import { Disease } from '@prisma/client';
import { FieldConfig } from '@/types/field-config';
import { useSubmitForm } from '@/hooks/use-submit-form';
import NewForm from '../common/new-form';

interface Props {
  oldDisease?: Disease;
  handler?: (disease: Disease) => void;
  setModalOpen: (state: boolean) => void;
}

export default function DiseaseForm({
  oldDisease,
  handler,
  setModalOpen,
}: Props) {
  const { register, handleSubmit, reset } = useForm();

  const { onSubmit, isLoading } = useSubmitForm({
    entity: 'diseases',
    endpoint: oldDisease ? `/${oldDisease.id}` : '',
    oldEntity: oldDisease,
    returnEntity: 'disease',
    handler,
    setModalOpen,
    reset,
  });

  const fields = getFields(oldDisease);

  return (
    <NewForm
      fields={fields}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      onSubmit={onSubmit}
      register={register}
      oldEntity={oldDisease}
    />
  );
}

function getFields(oldDisease: Disease | undefined): FieldConfig[] {
  return [
    {
      fieldName: 'id',
      label: 'ID',
      placeholder: 'Id de la enfermedad',
      type: 'text',
      visible: false,
      defaultValue: oldDisease?.id,
    },
    {
      fieldName: 'name',
      label: 'Nombre',
      placeholder: 'Nombre de la enfermedad',
      type: 'text',
      required: true,
      defaultValue: oldDisease?.name,
    },
  ];
}

import { useForm } from 'react-hook-form';
import { TreatmentType } from '@prisma/client';
import { FieldConfig } from '@/types/FieldConfig';
import { useSubmitForm } from '@/hooks/useSubmitForm';
import NewForm from '../Common/NewForm';

interface Props {
  oldTreatmentType?: TreatmentType;
  handler?: (treatmentType: TreatmentType) => void;
  setModalOpen: (state: boolean) => void;
}

export default function TreatmentTypeForm({
  setModalOpen,
  handler,
  oldTreatmentType,
}: Props) {
  const { register, handleSubmit, reset } = useForm();
  const fields = getFields(oldTreatmentType);

  const { onSubmit, isLoading } = useSubmitForm({
    entity: 'treatment-types',
    oldEntity: oldTreatmentType,
    returnEntity: 'treatmentType',
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
      oldEntity={oldTreatmentType}
    />
  );
}

function getFields(oldTreatmentType: TreatmentType | undefined): FieldConfig[] {
  return [
    {
      fieldName: 'id',
      label: 'ID',
      placeholder: 'Id del tipo de tratamiento',
      type: 'text',
      visible: false,
      defaultValue: oldTreatmentType?.id,
    },
    {
      fieldName: 'name',
      label: 'Nombre',
      placeholder: 'Nombre del tipo de tratamiento',
      type: 'text',
      required: true,
      defaultValue: oldTreatmentType?.name,
    },
  ];
}

import { useForm } from 'react-hook-form';
import { PreviousSurgery } from '@prisma/client';
import { FieldConfig } from '@/types/FieldConfig';
import Form from '../Common/Form';
import { useSubmitForm } from '@/hooks/useSubmitForm';

interface Props {
  buttonText: string;
  oldPreviousSurgery?: PreviousSurgery;
  patientId: string;
  addPreviousSurgery?: (previousSurgery: PreviousSurgery) => void;
  setModalOpen: (state: boolean) => void;
}

export default function PreviousSurgeryForm({
  buttonText,
  oldPreviousSurgery,
  patientId,
  addPreviousSurgery,
  setModalOpen,
}: Props) {
  const { register, handleSubmit, reset } = useForm();

  const dataModifier = (data: any) => {
    if (data.id === '') delete data.id;
    return {
      ...data,
      patientId,
    };
  };

  const { onSubmit, isLoading } = useSubmitForm({
    entity: 'previous-surgeries',
    oldEntity: oldPreviousSurgery,
    returnEntity: 'previousSurgery',
    dataModifier,
    reset,
    setModalOpen,
  });

  const fields = getFields(oldPreviousSurgery);

  return (
    <Form
      buttonText={buttonText}
      fields={fields}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      onSubmit={onSubmit}
      register={register}
    />
  );
}

function getFields(
  oldPreviousSurgery: PreviousSurgery | undefined,
): FieldConfig[] {
  return [
    {
      fieldName: 'id',
      label: 'ID',
      placeholder: 'Id de la cirugia',
      type: 'text',
      visible: false,
      defaultValue: oldPreviousSurgery?.id,
    },
    {
      fieldName: 'surgeryType',
      label: 'Tipo',
      placeholder: 'Tipo de cirguia',
      type: 'text',
      required: true,
      defaultValue: oldPreviousSurgery?.surgeryType,
    },
    {
      fieldName: 'observations',
      label: 'Observaciones',
      placeholder: 'Observaciones',
      type: 'text',
      defaultValue: oldPreviousSurgery?.observations,
    },
  ];
}

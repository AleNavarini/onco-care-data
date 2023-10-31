import { useForm } from 'react-hook-form';
import { Symptom } from '@prisma/client';
import { FieldConfig } from '@/types/FieldConfig';
import Form from '../Common/Form';
import { useSubmitForm } from '@/hooks/useSubmitForm';

interface Props {
  buttonText: string;
  oldSymptom?: Symptom;
  patientId: string;
  addSymptom?: (symptom: Symptom) => void;
  setModalOpen: (state: boolean) => void;
}

export default function SymptomForm({
  buttonText,
  patientId,
  setModalOpen,
  addSymptom,
  oldSymptom,
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
    entity: 'symptoms',
    endpoint: oldSymptom ? `/${oldSymptom.id}` : '',
    handler: addSymptom,
    returnEntity: 'symptom',
    oldEntity: oldSymptom,
    dataModifier,
    setModalOpen,
    reset,
  });

  const fields = getFields(oldSymptom);

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

function getFields(oldSymptom: Symptom | undefined): FieldConfig[] {
  return [
    {
      fieldName: 'id',
      label: 'ID',
      placeholder: 'Id del sintoma',
      type: 'text',
      visible: false,
      defaultValue: oldSymptom?.id,
    },
    {
      fieldName: 'name',
      label: 'Nombre',
      placeholder: 'Nombre del sintoma',
      type: 'text',
      required: true,
      defaultValue: oldSymptom?.name,
    },
    {
      fieldName: 'value',
      label: 'Valor',
      placeholder: 'Valor del sintoma ... (opcional)',
      type: 'text',
      defaultValue: oldSymptom?.value,
    },
  ];
}

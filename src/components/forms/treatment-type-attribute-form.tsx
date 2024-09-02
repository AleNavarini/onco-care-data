import { useForm } from 'react-hook-form';
import { TreatmentTypeAttribute } from '@prisma/client';
import { FieldConfig } from '@/types/field-config';
import Form from '../common/form';
import { useSubmitForm } from '@/hooks/use-submit-form';

interface Props {
  buttonText: string;
  oldTreatmentTypeAttribute?: TreatmentTypeAttribute;
  treatmentTypeId: string;
  treatmentId?: string;
  handler?: (treatmentTypeAttribute: TreatmentTypeAttribute) => void;
  setModalOpen: (state: boolean) => void;
}

export default function TreatmentTypeAttributeForm({
  buttonText,
  setModalOpen,
  treatmentTypeId,
  handler,
  oldTreatmentTypeAttribute,
  treatmentId,
}: Props) {
  const { register, handleSubmit, reset } = useForm();

  const dataModifier = (data: any) => ({
    ...data,
    treatmentTypeId,
  });

  const { onSubmit, isLoading } = useSubmitForm({
    entity: 'treatment-types-attributes',
    oldEntity: oldTreatmentTypeAttribute,
    returnEntity: 'treatmentTypeAttribute',
    dataModifier,
    reset,
    setModalOpen,
    handler,
  });

  const fields = getFields(oldTreatmentTypeAttribute, treatmentId);

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
  oldTreatmentTypeAttribute: TreatmentTypeAttribute | undefined,
  treatmentId: string | undefined,
): FieldConfig[] {
  const fields: FieldConfig[] = [
    {
      fieldName: 'id',
      label: 'ID',
      placeholder: 'Id del atributo',
      type: 'text',
      visible: false,
      defaultValue: oldTreatmentTypeAttribute?.id,
    },
    {
      fieldName: 'name',
      label: 'Nombre',
      placeholder: 'Nombre del atributo',
      type: 'text',
      required: true,
      defaultValue: oldTreatmentTypeAttribute?.name,
    },
  ];

  if (treatmentId) {
    fields.push({
      fieldName: 'value',
      label: 'Valor',
      placeholder: 'Valor del atributo ...',
      type: 'text',
      defaultValue: oldTreatmentTypeAttribute?.value,
    });
  }

  return fields;
}
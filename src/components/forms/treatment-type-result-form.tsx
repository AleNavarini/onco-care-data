import { useForm } from 'react-hook-form';
import { TreatmentTypeResult } from '@prisma/client';
import { FieldConfig } from '@/types/field-config';
import Form from '../common/form';
import { useSubmitForm } from '@/hooks/use-submit-form';

interface Props {
  buttonText: string;
  oldTreatmentTypeResult?: TreatmentTypeResult;
  treatmentTypeId: string;
  treatmentId?: string;
  handler?: (treatmentTypeResult: TreatmentTypeResult) => void;
  setModalOpen: (state: boolean) => void;
}

export default function TreatmentTypeResultForm({
  buttonText,
  setModalOpen,
  treatmentTypeId,
  handler,
  oldTreatmentTypeResult,
  treatmentId,
}: Props) {
  const { register, handleSubmit, reset } = useForm();

  const dataModifier = (data: any) => ({
    ...data,
    treatmentTypeId,
  });

  const { onSubmit, isLoading } = useSubmitForm({
    entity: 'treatment-types-results',
    oldEntity: oldTreatmentTypeResult,
    returnEntity: 'treatmentTypeResult',
    dataModifier,
    reset,
    setModalOpen,
    handler,
  });

  const fields = getFields(oldTreatmentTypeResult, treatmentId);

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
  oldTreatmentTypeResult: TreatmentTypeResult | undefined,
  treatmentId: string | undefined,
): FieldConfig[] {
  const fields: FieldConfig[] = [
    {
      fieldName: 'id',
      label: 'ID',
      placeholder: 'Id del resultado',
      type: 'text',
      visible: false,
      defaultValue: oldTreatmentTypeResult?.id,
    },
    {
      fieldName: 'name',
      label: 'Nombre',
      placeholder: 'Nombre del resultado',
      type: 'text',
      required: true,
      defaultValue: oldTreatmentTypeResult?.name,
    },
  ];

  if (treatmentId) {
    fields.push({
      fieldName: 'value',
      label: 'Valor',
      placeholder: 'Valor del resultado ...',
      type: 'text',
      defaultValue: oldTreatmentTypeResult?.value,
    });
  }

  return fields;
}

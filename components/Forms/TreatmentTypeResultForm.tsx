import { Button, Sheet, Stack } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { TreatmentTypeResult } from '@prisma/client';
import Container from '../Common/Container';
import { fetchData } from '@/utils/fetchData';
import SubmitButton from '../Common/SubmitButton';
import { FieldConfig } from '@/types/FieldConfig';
import FormFieldsMapper from '../Common/FormFieldsMapper';
import Form from '../Common/Form';

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
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    data = { ...data, treatmentTypeId };

    try {
      setIsLoading(true);
      const entity = 'treatment-types-results';
      const endpoint = oldTreatmentTypeResult
        ? `/${oldTreatmentTypeResult.id}`
        : '';
      const method = oldTreatmentTypeResult ? 'PUT' : 'POST';
      const result = await fetchData(entity + endpoint, method, data);
      if (result.status === 200) reset();
      if (handler) handler(result.treatmentTypeResult);

      setModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

import { Button, Sheet, Stack } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { TreatmentTypeAttribute } from '@prisma/client';
import Container from '../Common/Container';
import { fetchData } from '@/utils/fetchData';
import SubmitButton from '../Common/SubmitButton';
import { FieldConfig } from '@/types/FieldConfig';
import FormFieldsMapper from '../Common/FormFieldsMapper';
import Form from '../Common/Form';
import { useSubmitForm } from '@/hooks/useSubmitForm';

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

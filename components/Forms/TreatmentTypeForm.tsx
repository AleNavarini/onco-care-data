import { Button, Sheet, Stack } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { TreatmentType } from '@prisma/client';
import Container from '../Common/Container';
import { fetchData } from '@/utils/fetchData';
import SubmitButton from '../Common/SubmitButton';
import { FieldConfig } from '@/types/FieldConfig';
import FormFieldsMapper from '../Common/FormFieldsMapper';
import Form from '../Common/Form';
import { useSubmitForm } from '@/hooks/useSubmitForm';

interface Props {
  buttonText: string;
  oldTreatmentType?: TreatmentType;
  handler?: (treatmentType: TreatmentType) => void;
  setModalOpen: (state: boolean) => void;
}

export default function TreatmentTypeForm({
  buttonText,
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
    handler
  });

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

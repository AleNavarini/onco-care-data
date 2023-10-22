import { Button, Sheet, Stack } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Disease } from '@prisma/client';
import Container from '../Common/Container';
import { fetchData } from '@/utils/fetchData';
import SubmitButton from '../Common/SubmitButton';
import { FieldConfig } from '@/types/FieldConfig';
import FormFieldsMapper from '../Common/FormFieldsMapper';
import Form from '../Common/Form';
import { useSubmitForm } from '@/hooks/useSubmitForm';

interface Props {
  buttonText: string;
  oldDisease?: Disease;
  addDisease?: (disease: Disease) => void;
  setModalOpen: (state: boolean) => void;
}

export default function DiseaseForm({
  buttonText,
  oldDisease,
  addDisease,
  setModalOpen,
}: Props) {
  const { register, handleSubmit, reset } = useForm();

  const { onSubmit, isLoading } = useSubmitForm({
    entity: 'diseases',
    endpoint: oldDisease ? `/${oldDisease.id}` : '',
    oldEntity: oldDisease,
    returnEntity: 'disease',
    handler: addDisease,
    setModalOpen,
    reset,
  });

  const fields = getFields(oldDisease);

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

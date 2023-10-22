'use client';
import { Button, Sheet, Stack } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { Gestation } from '@prisma/client';
import Container from '../Common/Container';
import { fetchData } from '@/utils/fetchData';
import SubmitButton from '../Common/SubmitButton';
import { FieldConfig } from '@/types/FieldConfig';
import FormFieldsMapper from '../Common/FormFieldsMapper';
import Form from '../Common/Form';
import { useSubmitForm } from '@/hooks/useSubmitForm';

interface Props {
  patientId: string;
  gestation: Gestation | undefined;
}
export default function GestationForm({ patientId, gestation }: Props) {
  const { register, handleSubmit, reset } = useForm();
  const fields = getFields(gestation);
  const dimensions = getContainerDimensions();

  const dataModifier = (data: any) => ({
    ...data,
    patientId,
  });

  const { onSubmit, isLoading } = useSubmitForm({
    entity: 'gestations',
    oldEntity: gestation,
    returnEntity: 'followUp',
    dataModifier,
    reset,
  });

  return (
    <Form
      buttonText={'Guardar'}
      fields={fields}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      onSubmit={onSubmit}
      register={register}
      dimensions={dimensions}
    />
  );
}

function getFields(gestation: Gestation | undefined): FieldConfig[] {
  return [
    {
      fieldName: 'births',
      label: 'Partos',
      placeholder: 'Cantidad de Partos',
      type: 'number',
      defaultValue: gestation?.births,
    },
    {
      fieldName: 'abortions',
      label: 'Abortos',
      placeholder: 'Cantidad de Abortos',
      type: 'number',
      defaultValue: gestation?.abortions,
    },
    {
      fieldName: 'cesareans',
      label: 'Cesareas',
      placeholder: 'Cantidad de Cesareas',
      type: 'number',
      defaultValue: gestation?.cesareans,
    },
  ];
}

function getContainerDimensions() {
  return { width: '100%' };
}

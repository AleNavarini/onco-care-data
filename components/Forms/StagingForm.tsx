import { Button, Sheet, Stack } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { Staging } from '@prisma/client';
import Container from '../Common/Container';
import { fetchData } from '@/utils/fetchData';
import SubmitButton from '../Common/SubmitButton';
import { FieldConfig } from '@/types/FieldConfig';
import FormFieldsMapper from '../Common/FormFieldsMapper';
import Form from '../Common/Form';
import { useSubmitForm } from '@/hooks/useSubmitForm';

interface Props {
  buttonText: string;
  oldStaging?: Staging;
  patientId: string;
  handler?: (staging: Staging) => void;
  setModalOpen: (state: boolean) => void;
}

export default function StagingForm({
  buttonText,
  oldStaging,
  patientId,
  handler,
  setModalOpen,
}: Props) {
  const { register, handleSubmit, reset } = useForm();

  const dataModifier = (data: any) => ({
    ...data,
    patientId,
  });

  const { onSubmit, isLoading } = useSubmitForm({
    entity: 'stagings',
    oldEntity: oldStaging,
    returnEntity: 'staging',
    dataModifier,
    reset,
    setModalOpen,
    handler,
  });

  const fields = getFields(oldStaging);

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

function getFields(oldStaging: Staging | undefined): FieldConfig[] {
  const dateString = oldStaging?.date.toString();
  return [
    {
      fieldName: 'id',
      label: 'ID',
      placeholder: 'Id de la gesta',
      type: 'text',
      visible: false,
      defaultValue: oldStaging?.id,
    },
    {
      fieldName: 'date',
      label: 'Fecha',
      placeholder: 'Fecha de la estadificacion',
      type: 'date',
      defaultValue: dateString
        ? dateString.split('T')[0]
        : new Date().toISOString().split('T')[0],
    },
    {
      fieldName: 'type',
      label: 'Tipo',
      placeholder: 'Tipo de Figo (quirurjica o clinica)',
      type: 'text',
      defaultValue: oldStaging?.type,
    },
    {
      fieldName: 'figo',
      label: 'FIGO',
      placeholder: 'Figo',
      type: 'text',
      defaultValue: oldStaging?.figo,
    },
  ];
}

import { Button, Sheet, Stack } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { StudyType } from '@prisma/client';
import Container from '../Common/Container';
import { fetchData } from '@/utils/fetchData';
import SubmitButton from '../Common/SubmitButton';
import { FieldConfig } from '@/types/FieldConfig';
import FormFieldsMapper from '../Common/FormFieldsMapper';
import Form from '../Common/Form';
import { useSubmitForm } from '@/hooks/useSubmitForm';

interface Props {
  buttonText: string;
  oldStudyType?: StudyType;
  handler?: (studyType: StudyType) => void;
  setModalOpen: (state: boolean) => void;
}

export default function StudyTypeForm({
  buttonText,
  setModalOpen,
  handler,
  oldStudyType,
}: Props) {
  const { register, handleSubmit, reset } = useForm();
  const fields = getFields(oldStudyType);

  const { onSubmit, isLoading } = useSubmitForm({
    entity: 'study-types',
    oldEntity: oldStudyType,
    returnEntity: 'studyType',
    reset,
    setModalOpen,
    handler,
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

function getFields(oldStudyType: StudyType | undefined): FieldConfig[] {
  return [
    {
      fieldName: 'id',
      label: 'ID',
      placeholder: 'Id del tipo de estudio',
      type: 'text',
      visible: false,
      defaultValue: oldStudyType?.id,
    },
    {
      fieldName: 'name',
      label: 'Nombre',
      placeholder: 'Nombre del tipo de estudio',
      type: 'text',
      required: true,
      defaultValue: oldStudyType?.name,
    },
  ];
}

import { Button, Sheet, Stack } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { StudyTypeAttribute } from '@prisma/client';
import Container from '../Common/Container';
import { fetchData } from '@/utils/fetchData';
import SubmitButton from '../Common/SubmitButton';
import { FieldConfig } from '@/types/FieldConfig';
import FormFieldsMapper from '../Common/FormFieldsMapper';
import Form from '../Common/Form';
import { useSubmitForm } from '@/hooks/useSubmitForm';

interface Props {
  buttonText: string;
  oldStudyTypeAttribute?: StudyTypeAttribute;
  studyTypeId: string;
  studyId?: string;
  handler?: (riskFactor: StudyTypeAttribute) => void;
  setModalOpen: (state: boolean) => void;
}

export default function StudyTypeAttributeForm({
  buttonText,
  setModalOpen,
  studyTypeId,
  handler,
  oldStudyTypeAttribute,
  studyId,
}: Props) {
  const { register, handleSubmit, reset } = useForm();

  const dataModifier = (data: any) => ({
    ...data,
    studyTypeId,
  });

  const { onSubmit, isLoading } = useSubmitForm({
    entity: 'study-types-attributes',
    oldEntity: oldStudyTypeAttribute,
    returnEntity: 'studyTypeAttribute',
    dataModifier,
    reset,
    setModalOpen,
    handler,
  });

  const fields = getFields(oldStudyTypeAttribute, studyId);

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
  oldStudyTypeAttribute: StudyTypeAttribute | undefined,
  studyId: string | undefined,
): FieldConfig[] {
  const fields: FieldConfig[] = [
    {
      fieldName: 'id',
      label: 'ID',
      placeholder: 'Id del atributo',
      type: 'text',
      visible: false,
      defaultValue: oldStudyTypeAttribute?.id,
    },
    {
      fieldName: 'name',
      label: 'Nombre',
      placeholder: 'Nombre del atributo',
      type: 'text',
      required: true,
      defaultValue: oldStudyTypeAttribute?.name,
    },
  ];

  if (studyId) {
    fields.push({
      fieldName: 'value',
      label: 'Valor',
      placeholder: 'Valor del atributo ...',
      type: 'text',
      defaultValue: oldStudyTypeAttribute?.value,
    });
  }

  return fields;
}

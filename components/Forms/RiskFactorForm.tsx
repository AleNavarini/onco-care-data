import { Stack } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { RiskFactor } from '@prisma/client';
import Container from '../Common/Container';
import { fetchData } from '@/utils/fetchData';
import SubmitButton from '../Common/SubmitButton';
import { FieldConfig } from '@/types/FieldConfig';
import FormFieldsMapper from '../Common/FormFieldsMapper';
import Form from '../Common/Form';
import { useSubmitForm } from '@/hooks/useSubmitForm';

interface Props {
  buttonText: string;
  oldRiskFactor?: RiskFactor;
  patientId?: string;
  diseaseId?: string;
  handler?: (riskFactor: RiskFactor) => void;
  setModalOpen: (state: boolean) => void;
}

export default function RiskFactorForm({
  buttonText,
  oldRiskFactor,
  patientId,
  diseaseId,
  handler,
  setModalOpen,
}: Props) {
  const { register, handleSubmit, reset } = useForm();

  const dataModifier = (data: any) => {
    if (patientId) data = { ...data, patientId };
    if (diseaseId) data = { ...data, diseaseId };
    return data;
  };

  const { onSubmit, isLoading } = useSubmitForm({
    entity: 'risk-factors',
    oldEntity: oldRiskFactor,
    returnEntity: 'riskFactor',
    dataModifier,
    reset,
    setModalOpen,
    handler,
  });

  const fields = getFields(oldRiskFactor, patientId);

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
  oldRiskFactor: RiskFactor | undefined,
  patientId: string | undefined,
): FieldConfig[] {
  const fields: FieldConfig[] = [
    {
      fieldName: 'id',
      label: 'ID',
      placeholder: 'Id del factor de riesgo',
      type: 'text',
      visible: false,
      defaultValue: oldRiskFactor?.id,
    },
    {
      fieldName: 'name',
      label: 'Nombre',
      placeholder: 'Nombre del factor del riesgo',
      type: 'text',
      required: true,
      defaultValue: oldRiskFactor?.name,
    },
  ];

  if (patientId) {
    fields.push({
      fieldName: 'value',
      label: 'Valor',
      placeholder: 'Valor del factor de riesgo ...',
      type: 'text',
      defaultValue: oldRiskFactor?.value,
    });
  }

  return fields;
}

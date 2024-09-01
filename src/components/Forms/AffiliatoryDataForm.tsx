'use client';
import { useForm } from 'react-hook-form';
import { AffiliatoryData } from '@prisma/client';
import { FieldConfig } from '@/types/FieldConfig';
import Form from '../Common/Form';
import { useSubmitForm } from '@/hooks/useSubmitForm';

export default function AffiliatoryDataForm({
  patientId,
  affiliatoryData,
}: {
  patientId: string;
  affiliatoryData: AffiliatoryData;
}) {
  const { register, handleSubmit } = useForm();
  const fields = getFields(affiliatoryData);
  const dimensions = getContainerDimensions();

  const dataModifier = (data: any) => ({
    ...data,
    patientId,
  });

  const { onSubmit, isLoading } = useSubmitForm({
    entity: 'affiliatory-data',
    endpoint: '',
    oldEntity: null,
    dataModifier,
  });

  return (
    <Form
      buttonText="Guardar"
      fields={fields}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      isLoading={isLoading}
      register={register}
      dimensions={dimensions}
    />
  );
}

function getFields(
  affiliatoryData: AffiliatoryData | undefined,
): FieldConfig[] {
  const firstConsultString = affiliatoryData?.firstConsult?.toString();
  return [
    {
      fieldName: 'firstConsult',
      label: 'Primera Consulta',
      placeholder: 'Primera Consulta',
      type: 'date',
      defaultValue: firstConsultString
        ? firstConsultString.split('T')[0]
        : new Date().toISOString().split('T')[0],
    },
    {
      fieldName: 'institution',
      label: 'Institucion',
      placeholder: 'Institucion',
      type: 'text',
      defaultValue: affiliatoryData?.institution,
    },
    {
      fieldName: 'doctor',
      label: 'Doctor',
      placeholder: 'Doctor',
      type: 'text',
      defaultValue: affiliatoryData?.doctor,
    },
    {
      fieldName: 'usualMedication',
      label: 'Medicación habitual',
      placeholder: 'Medicación habitual',
      type: 'text',
      defaultValue: affiliatoryData?.usualMedication,
    },
    {
      fieldName: 'socialWorkIntervention',
      label: 'Intervención de trabajo social',
      placeholder: 'Intervención de trabajo social',
      type: 'text',
      defaultValue: affiliatoryData?.socialWorkIntervention,
    },
    {
      fieldName: 'bmi',
      label: 'IMC',
      placeholder: 'IMC',
      type: 'number',
      defaultValue: affiliatoryData?.bmi,
    },
    {
      fieldName: 'firstPregnancyAge',
      label: 'Primer embarazo',
      placeholder: 'Primer embarazo',
      type: 'number',
      defaultValue: affiliatoryData?.firstPregnancyAge,
    },
    {
      fieldName: 'lastPregnancyAge',
      label: 'Ultimo embarazo',
      placeholder: 'Ultimo embarazo',
      type: 'number',
      defaultValue: affiliatoryData?.lastPregnancyAge,
    },
    {
      fieldName: 'contraception',
      label: 'Anticoncepción',
      placeholder: 'Anticoncepción',
      type: 'text',
      defaultValue: affiliatoryData?.contraception,
    },
    {
      fieldName: 'currentPregnancyControl',
      label: 'Control de embarazo actual',
      placeholder: 'Control de embarazo actual',
      type: 'text',
      defaultValue: affiliatoryData?.currentPregnancyControl,
    },
  ];
}

function getContainerDimensions() {
  return { width: '100%' };
}

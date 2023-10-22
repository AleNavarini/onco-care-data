'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AffiliatoryData } from '@prisma/client';
import Container from '../Common/Container';
import SubmitButton from '../Common/SubmitButton';
import { FieldConfig } from '@/types/FieldConfig';
import FormFieldsMapper from '../Common/FormFieldsMapper';
import { fetchData } from '@/utils/fetchData';

export default function AffiliatoryDataForm({
  patientId,
  affiliatoryData,
}: {
  patientId: string;
  affiliatoryData: AffiliatoryData;
}) {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const fields = getFields(affiliatoryData);

  const onSubmit = async (data: any) => {
    data = { ...data, patientId };

    try {
      setIsLoading(true);
      await fetchData('affiliatory-data', 'POST', data);
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container isLoading={isLoading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormFieldsMapper register={register} fields={fields} />
        <SubmitButton isLoading={isLoading}>Guardar</SubmitButton>
      </form>
    </Container>
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

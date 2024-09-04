'use client';
import { useForm } from 'react-hook-form';
import { AffiliatoryData } from '@prisma/client';
import { FieldConfig } from '@/types/field-config';
import Form from '../common/form';
import { useSubmitForm } from '@/hooks/use-submit-form';
import { z } from 'zod';
import ZodForm from './zod-form/zod-form';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

interface Props {
  patientId: string;
}

export default function AffiliatoryDataForm({ patientId }: Props) {
  const { data } = useSWR(`/api/affiliatory-data/${patientId}`, fetcher, {
    suspense: true,
  });

  const endpoint = 'affiliatory-data';
  const formSchema = z.object({
    id: z.string().describe('Id').optional(),
    firstConsult: z.string().date().describe('Primera Consulta').optional(),
    institution: z.string().describe('Institucion').optional(),
    doctor: z.string().describe('Doctor').optional(),
    bmi: z.number().describe('IMC').optional(),
    usualMedication: z.string().describe('Medicación habitual').optional(),
    socialWorkIntervention: z
      .string()
      .describe('Intervención de trabajo social')
      .optional(),
    firstPregnancyAge: z.number().describe('Primer embarazo').optional(),
    lastPregnancyAge: z.number().describe('Ultimo embarazo').optional(),
    contraception: z.string().describe('Anticoncepción').optional(),
    currentPregnancyControl: z
      .string()
      .describe('Control de embarazo actual')
      .optional(),
    patientId: z.bigint().describe('Id del paciente').optional(),
  });

  return (
    <ZodForm
      key={'affiliatory-data-form'}
      formSchema={formSchema}
      hiddenFields={['id', 'patientId']}
      endpoint={endpoint}
      entity={data}
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

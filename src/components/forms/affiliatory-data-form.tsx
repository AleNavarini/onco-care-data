'use client';
import { z } from 'zod';
import ZodForm from './zod-form/zod-form';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';
import CenteredLoading from '../ui/centered-loading';

interface Props {
  patientId: string;
}

export default function AffiliatoryDataForm({ patientId }: Props) {
  const { data, isLoading } = useSWR(`/api/v1/affiliatory-data/${patientId}`, fetcher);
  if (isLoading) return <CenteredLoading />;

  const endpoint = '/v1/affiliatory-data';
  const formSchema = z.object({
    id: z.string().describe('Id').optional(),
    firstConsult: z
      .string()
      .date()
      .describe('Fecha de Primera Consulta')
      .optional(),
    institution: z.string().describe('Institucion').optional(),
    doctor: z.string().describe('Doctor').optional(),
    bmi: z.number().describe('IMC').optional(),
    usualMedication: z.string().describe('Medicación habitual').optional(),
    socialWorkIntervention: z
      .string()
      .describe('Intervención de trabajo social')
      .optional(),
    firstPregnancyAge: z
      .number()
      .describe('Edad del Primer embarazo')
      .optional(),
    lastPregnancyAge: z
      .number()
      .describe('Edad del Ultimo embarazo')
      .optional(),
    contraception: z.string().describe('Anticoncepción').optional(),
    currentPregnancyControl: z
      .string()
      .describe('Control de embarazo actual')
      .optional(),
    patientId: z.bigint().describe('Id del paciente').optional(),
  });

  const hiddenFields = ['id', 'patientId'];

  const affiliatoryData = data.affiliatoryData;
  const date = affiliatoryData?.firstConsult
    ? new Date(affiliatoryData.firstConsult).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];

  const entity = {
    ...data.affiliatoryData,
    patientId: data.patientId ? BigInt(data.patientId) : BigInt(patientId),
    firstConsult: date,
  };

  return (
    <ZodForm
      key={'affiliatory-data-form'}
      formSchema={formSchema}
      hiddenFields={hiddenFields}
      endpoint={endpoint}
      entity={entity}
      customMutate={`/api/v1/affiliatory-data/${patientId}`}
    />
  );
}

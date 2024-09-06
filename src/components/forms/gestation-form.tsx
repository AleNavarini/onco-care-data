'use client';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { z } from 'zod';
import ZodForm from './zod-form/zod-form';
import CenteredLoading from '../ui/centered-loading';

const endpoint = '/v1/gestations';
interface Props {
  patientId: string;
}

export default function GestationForm({ patientId }: Props) {
  const { data, isLoading } = useSWR(`/api/v2/patients/${patientId}/gestations`, fetcher);
  if (isLoading) return <CenteredLoading />;

  const formSchema = z.object({
    id: z.string().describe('Id').optional(),
    patientId: z.bigint().describe('Id del paciente').optional(),
    births: z
      .union([z.number().nonnegative(), z.null(), z.nan()])
      .describe('Cantidad de partos')
      .optional(),
    abortions: z
      .union([z.number().nonnegative(), z.null(), z.nan()])
      .describe('Cantidad de abortos')
      .optional(),
    cesareans: z
      .union([z.number().nonnegative(), z.null(), z.nan()])
      .describe('Cantidad de cesareas')
      .optional(),
  });
  const gestations = data.data;
  const entity = {
    ...gestations,
    patientId: gestations?.patientId
      ? BigInt(gestations.patientId)
      : BigInt(patientId),
  };

  return (
    <ZodForm
      key={'gestation-form'}
      formSchema={formSchema}
      hiddenFields={['id', 'patientId']}
      endpoint={endpoint}
      entity={entity}
      customMutate={`/api/v2/patients/${patientId}/gestations`}
    />
  );
}

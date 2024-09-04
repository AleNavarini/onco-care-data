'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Gestation } from '@prisma/client';
import { FieldConfig } from '@/types/field-config';
import Form from '../common/form';
import { useSubmitForm } from '@/hooks/use-submit-form';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { z } from 'zod';
import ZodForm from './zod-form/zod-form';

const endpoint = 'gestations';
interface Props {
  patientId: string;
}

export default function GestationForm({ patientId }: Props) {
  const { data } = useSWR(`/api/v2/patients/${patientId}/gestations`, fetcher, {
    suspense: true,
  });
  const formSchema = z.object({
    id: z.string().describe('Id').optional(),
    patientId: z.bigint().describe('Id del paciente').optional(),
    births: z.number().describe('Cantidad de partos').optional(),
    abortions: z.number().describe('Cantidad de abortos').optional(),
    cesareans: z.number().describe('Cantidad de cesareas').optional(),
  });

  const entity = {
    ...data,
    patientId: data.patientId ? BigInt(data.patientId) : BigInt(patientId),
  };

  return (
    <ZodForm
      key={'gestation-form'}
      formSchema={formSchema}
      hiddenFields={['id', 'patientId']}
      endpoint={endpoint}
      entity={entity}
    />
  );
}

function getFields(gestation: Gestation | undefined): FieldConfig[] {
  return [
    {
      fieldName: 'births',
      label: 'Partos',
      placeholder: 'Cantidad o 0 por defecto',
      type: 'number',
      defaultValue: gestation?.births,
    },
    {
      fieldName: 'abortions',
      label: 'Abortos',
      placeholder: 'Cantidad o 0 por defecto',
      type: 'number',
      defaultValue: gestation?.abortions,
    },
    {
      fieldName: 'cesareans',
      label: 'Cesareas',
      placeholder: 'Cantidad o 0 por defecto',
      type: 'number',
      defaultValue: gestation?.cesareans,
    },
  ];
}

function getContainerDimensions() {
  return { width: '100%' };
}

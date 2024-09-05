import { Stack, Select, Option, Typography, Box } from '@mui/joy';
import Field from '../forms/field';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import '@/lib/big-int-extensions';
import useSWR from 'swr';
import {
  Treatment,
  TreatmentType,
  TreatmentTypeAttribute,
  TreatmentTypeResult,
} from '@prisma/client';
import ComplicationsTable from '../tables/complications-table';
import SubmitButton from '../common/submit-button';
import { useSubmitForm } from '@/hooks/use-submit-form';
import { z } from 'zod';
import fetcher from '@/utils/fetcher';
import ZodForm from '../forms/zod-form/zod-form';

const fetchTreatments = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

interface FullTreatmentType extends TreatmentType {
  attributes?: TreatmentTypeAttribute[];
  results?: TreatmentTypeResult[];
}

interface Props {
  patientId: string;
  treatmentTypeId: string;
  oldTreatment?: any;
  closeModal?: () => void;
}

export default function TreatmentForm({
  treatmentTypeId,
  patientId,
  oldTreatment,
  closeModal,
}: Props) {
  const { data: attributesData } = useSWR(
    `/api/v2/treatment-types/${treatmentTypeId}/attributes`,
    fetcher,
    {
      suspense: true,
    },
  );
  const { data: resultsData } = useSWR(
    `/api/v2/treatment-types/${treatmentTypeId}/results`,
    fetcher,
    {
      suspense: true,
    },
  );

  const endpoint = `/v2/patients/${patientId}/treatments`;

  const baseSchema = z.object({
    id: z.string().describe('Id').optional(),
    startDate: z.string().date().describe('Fecha de inicio').optional(),
    endDate: z.string().date().describe('Fecha de fin').optional(),
    patientId: z.bigint().describe('Id del paciente').optional(),
    treatmentTypeId: z
      .bigint()
      .describe('Id del tipo de tratamiento')
      .optional(),
  });

  const attributes = attributesData.data.attributes;
  const results = resultsData.data.results;

  const dynamicAttributesSchema = attributes.reduce(
    (acc, attribute) => {
      acc[attribute.name] = z
        .string()
        .optional()
        .describe(`Atributo : ${attribute.name}`);
      return acc;
    },
    {} as Record<string, z.ZodTypeAny>,
  );

  const baseAttributesSchema = baseSchema.extend(dynamicAttributesSchema);

  const dynamicResultsSchema = results.reduce(
    (acc, result) => {
      acc[result.name] = z
        .string()
        .optional()
        .describe(`Resultado : ${result.name}`);
      return acc;
    },
    {} as Record<string, z.ZodTypeAny>,
  );

  const extendedFormSchema = baseAttributesSchema.extend(dynamicResultsSchema);

  const entity = {
    ...oldTreatment,
    treatmentTypeId: BigInt(treatmentTypeId),
    patientId: BigInt(patientId),
  };

  return (
    <ZodForm
      key={'treatment-form'}
      formSchema={extendedFormSchema}
      hiddenFields={['id', 'patientId', 'treatmentTypeId']}
      endpoint={endpoint}
      entity={entity}
      closeModal={closeModal}
      customMutate={`/api/v1/patient-treatments/${patientId}`}
    />
  );
}

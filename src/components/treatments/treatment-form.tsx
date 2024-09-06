import React from 'react';
import '@/lib/big-int-extensions';
import useSWR from 'swr';
import { z } from 'zod';
import fetcher from '@/utils/fetcher';
import ZodForm from '../forms/zod-form/zod-form';
import CenteredLoading from '../ui/centered-loading';

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
  const { data: attributesData, isLoading: isLoadingAttributes } = useSWR(
    `/api/v2/treatment-types/${treatmentTypeId}/attributes`,
    fetcher
  );
  const { data: resultsData, isLoading: isLoadingResults } = useSWR(
    `/api/v2/treatment-types/${treatmentTypeId}/results`,
    fetcher
  );
  if (isLoadingAttributes || isLoadingResults) return <CenteredLoading />;

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

  const fullAttributesList = attributes.reduce(
    (acc, attribute) => {
      const existingAttribute = oldTreatment?.treatmentTypeAttributes.find(
        (attr) => attr.name === attribute.name,
      );
      acc[attribute.name] = existingAttribute?.value || ''; // Keep old value if present, else empty
      return acc;
    },
    {} as Record<string, string>,
  );

  const fullResultsList = results.reduce(
    (acc, result) => {
      const existingResult = oldTreatment?.treatmentTypeResults.find(
        (res) => res.name === result.name,
      );
      acc[result.name] = existingResult?.value || ''; // Keep old value if present, else empty
      return acc;
    },
    {} as Record<string, string>,
  );
  const startDate = oldTreatment?.startDate
    ? new Date(oldTreatment.startDate).toISOString().split('T')[0]
    : null;

  const endDate = oldTreatment?.endDate
    ? new Date(oldTreatment.endDate).toISOString().split('T')[0]
    : null;
  const entity = {
    ...oldTreatment,
    startDate: startDate,
    endDate: endDate,
    treatmentTypeId: BigInt(treatmentTypeId),
    patientId: BigInt(patientId),
    ...fullAttributesList,
    ...fullResultsList,
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

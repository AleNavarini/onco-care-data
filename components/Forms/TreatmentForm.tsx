import { Stack, Select, Option, Typography, Box } from '@mui/joy';
import Field from './Field';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import '../../lib/bigIntExtensions';
import useSWR from 'swr';
import {
  Treatment,
  TreatmentType,
  TreatmentTypeAttribute,
  TreatmentTypeResult,
} from '@prisma/client';
import ComplicationsTable from '../Tables/ComplicationsTable';
import SubmitButton from '../Common/SubmitButton';
import { useSubmitForm } from '@/hooks/useSubmitForm';

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
  setModalOpen?: (state: boolean) => void;
  oldTreatment?: any;
  handler?: (treatment: Treatment) => void;
}

export default function TreatmentForm({
  patientId,
  setModalOpen,
  oldTreatment,
  handler,
}: Props) {
  const { register, handleSubmit, reset } = useForm();
  const [selectedTreatmentType, setSelectedTreatmentType] = useState(
    oldTreatment ? oldTreatment.treatmentTypeId : '',
  );

  const { data } = useSWR(`/api/treatment-types`, fetchTreatments, {
    refreshInterval: 5000,
  });
  const treatmentTypes: FullTreatmentType[] = data?.treatmentTypes;
  const treatmentTypeAttributes = treatmentTypes?.filter(
    (tt: FullTreatmentType) => tt.id.toString() === selectedTreatmentType,
  )[0]?.attributes;
  const treatmentTypeResults = treatmentTypes?.filter(
    (tt: FullTreatmentType) => tt.id.toString() === selectedTreatmentType,
  )[0]?.results;

  const handleChange = async (_e: null, value: string) => {
    setSelectedTreatmentType(value);
  };

  const dataModifier = (data: any) => ({
    ...data,
    patientId,
    treatmentTypeId: selectedTreatmentType,
  });

  const { onSubmit, isLoading } = useSubmitForm({
    entity: 'treatments',
    oldEntity: oldTreatment,
    returnEntity: 'treatment',
    dataModifier,
    reset,
    setModalOpen,
    handler,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Field
          fieldName="id"
          label="ID"
          placeholder="Id del tratamiento"
          register={register}
          type="text"
          visible={false}
          defaultValue={oldTreatment?.id}
        />
        <Field
          fieldName="startDate"
          label="Fecha de inicio"
          placeholder="Fecha del inicio del tratamiento"
          register={register}
          type="date"
          defaultValue={oldTreatment?.startDate?.toString().split('T')[0]}
        />
        <Field
          fieldName="endDate"
          label="Fecha de fin"
          placeholder="Fecha del fin del tratamiento"
          register={register}
          type="date"
          defaultValue={oldTreatment?.endDate?.toString().split('T')[0]}
        />
        <Stack direction={'row'}>
          <Typography
            sx={(theme) => ({
              color: theme.vars.palette.primary.plainColor,
            })}
            level="h4"
            width={'40%'}
          >
            Tipos de tratamiento
          </Typography>
          <Select
            // @ts-ignore
            onChange={handleChange}
            sx={{ width: '70%' }}
            placeholder="Choose one…"
            defaultValue={oldTreatment?.treatmentTypeId}
          >
            {treatmentTypes?.map((treatmentType: TreatmentType) => (
              <Option
                key={treatmentType.id.toString()}
                value={treatmentType.id}
              >
                {treatmentType?.name}
              </Option>
            ))}
          </Select>
        </Stack>
        <Stack
          direction={'row'}
          spacing={2}
          sx={{
            mx: 'auto',
          }}
        >
          <Box width={'45%'}>
            {treatmentTypeAttributes && (
              <Typography level="h4">Atributos</Typography>
            )}
            {treatmentTypeAttributes?.map(
              (attribute: TreatmentTypeAttribute) => {
                const defaultValue =
                  oldTreatment?.treatmentTypeAttributes?.filter(
                    (attr: TreatmentTypeAttribute) =>
                      attr.name === attribute.name,
                  )[0]?.value;
                return (
                  <Field
                    key={attribute.id.toString()}
                    fieldName={`attr-${attribute.name}`}
                    label={attribute.name}
                    placeholder={`${attribute.name}...`}
                    register={register}
                    type="text"
                    defaultValue={defaultValue}
                  />
                );
              },
            )}
          </Box>
          <Box width={'45%'}>
            {treatmentTypeResults && (
              <Typography level="h4">Resultados</Typography>
            )}
            {treatmentTypeResults?.map((result: TreatmentTypeResult) => {
              const defaultValue = oldTreatment?.treatmentTypeResults.filter(
                (res: TreatmentTypeResult) => res.name === result.name,
              )[0]?.value;
              return (
                <Field
                  key={result.id.toString()}
                  fieldName={`res-${result.name}`}
                  label={result.name}
                  placeholder={`${result.name}...`}
                  register={register}
                  type="text"
                  defaultValue={defaultValue}
                />
              );
            })}
          </Box>
        </Stack>
        {oldTreatment && (
          <React.Fragment>
            <Typography level="h4">Complicaciones</Typography>
            <ComplicationsTable
              complications={oldTreatment.complications}
              treatmentId={oldTreatment.id}
            />
          </React.Fragment>
        )}
      </Stack>
      <SubmitButton isLoading={isLoading}>
        {oldTreatment ? 'Actualizar' : 'Agregar'}
      </SubmitButton>
    </form>
  );
}

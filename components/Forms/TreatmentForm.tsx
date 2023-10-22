import {
  Sheet,
  Stack,
  Button,
  Select,
  Option,
  Typography,
  Box,
} from '@mui/joy';
import Field from './Field';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import '../../lib/bigIntExtensions';
import useSWR from 'swr';
import {
  Treatment,
  TreatmentType,
  TreatmentTypeAttribute,
  TreatmentTypeResult,
} from '@prisma/client';
import ComplicationsTable from '../Tables/ComplicationsTable';
import Container from '../Common/Container';
import { fetchData } from '@/utils/fetchData';
import SubmitButton from '../Common/SubmitButton';

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
  buttonText: string;
  patientId: string;
  setModalOpen: (state: boolean) => void;
  oldTreatment?: any;
  handler?: (treatment: Treatment) => void;
}

export default function TreatmentForm({
  buttonText,
  patientId,
  setModalOpen,
  oldTreatment,
  handler,
}: Props) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
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

  const onSubmit = async (data: any) => {
    data = { ...data, patientId, treatmentTypeId: selectedTreatmentType };

    try {
      setIsLoading(true);
      const entity = 'treatments';
      const endpoint = oldTreatment ? `/${oldTreatment.id}` : '';
      const method = oldTreatment ? 'PUT' : 'POST';
      const result = await fetchData(entity + endpoint, method, data);
      if (result.status === 200) reset();
      if (handler) handler(result.treatment);
      setModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const dimensions = getContainerDimensions();
  return (
    <Container dimensions={dimensions} isLoading={isLoading}>
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
            <>
              <Typography level="h4">Complicaciones</Typography>
              <ComplicationsTable
                complications={oldTreatment.complications}
                treatmentId={oldTreatment.id}
              />
            </>
          )}
        </Stack>
        <SubmitButton isLoading={isLoading}>{buttonText}</SubmitButton>
      </form>
    </Container>
  );
}

function getContainerDimensions() {
  const width = {
    sm: '90%',
    md: '60%',
    lg: '60%',
    xl: '50%',
  };
  const maxHeight = '100%';
  return { width, maxHeight };
}

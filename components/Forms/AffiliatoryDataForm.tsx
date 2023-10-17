'use client';
import { Box, Button, LinearProgress, Sheet, Stack } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { AffiliatoryData } from '@prisma/client';

export default function AffiliatoryDataForm({
  patientId,
  affiliatoryData,
}: {
  patientId: string;
  affiliatoryData: AffiliatoryData;
}) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const firstConsultString =
    affiliatoryData && affiliatoryData.firstConsult?.toString();

  const onSubmit = async (data: any) => {
    data = { ...data, patientId };

    try {
      setIsLoading(true);
      const response = await fetch('/api/affiliatory-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
    } catch (error) {
      alert(`Error: ${error}`);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isLoading && <LinearProgress />}
      <Sheet
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 'md',
          px: 2,
          py: 1,
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        }}
      >
        <Stack spacing={2}>
          <Field
            fieldName="firstConsult"
            label="Primera Consulta"
            register={register}
            type="date"
            defaultValue={
              firstConsultString
                ? firstConsultString?.split('T')[0]
                : new Date().toISOString().split('T')[0]
            }
          />
          <Field
            fieldName="institution"
            label="Institucion"
            register={register}
            type="text"
            defaultValue={affiliatoryData?.institution}
          />
          <Field
            fieldName="doctor"
            label="Doctor"
            register={register}
            type="text"
            defaultValue={affiliatoryData?.doctor}
          />
          <Field
            fieldName="usualMedication"
            label="Medicación habitual"
            register={register}
            type="text"
            defaultValue={affiliatoryData?.usualMedication}
          />
          <Field
            fieldName="socialWorkIntervention"
            label="Intervención de trabajo social"
            register={register}
            type="text"
            defaultValue={affiliatoryData?.socialWorkIntervention}
          />
          <Stack direction={'row'} spacing={2}>
            <Box width="30%">
              <Field
                fieldName="bmi"
                label="IMC"
                register={register}
                type="number"
                defaultValue={affiliatoryData?.bmi}
              />
            </Box>
            <Box width="30%">
              <Field
                fieldName="firstPregnancyAge"
                label="Primer embarazo"
                register={register}
                type="number"
                defaultValue={affiliatoryData?.firstPregnancyAge}
              />
            </Box>
            <Box width="30%">
              <Field
                fieldName="lastPregnancyAge"
                label="Ultimo embarazo"
                register={register}
                type="number"
                defaultValue={affiliatoryData?.lastPregnancyAge}
              />
            </Box>
          </Stack>

          <Field
            fieldName="contraception"
            label="Anticoncepción"
            register={register}
            type="text"
            defaultValue={affiliatoryData?.contraception}
          />

          <Field
            fieldName="currentPregnancyControl"
            label="Control de embarazo actual"
            register={register}
            type="text"
            defaultValue={affiliatoryData?.currentPregnancyControl}
          />
          <Button
            loading={isLoading}
            sx={{
              my: 2,
              width: '100%',
            }}
            variant="solid"
            type="submit"
          >
            Guardar
          </Button>
        </Stack>
      </Sheet>
    </form>
  );
}

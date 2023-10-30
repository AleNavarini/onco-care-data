import {
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { FollowUp } from '@prisma/client';
import Container from '../Common/Container';
import { fetchData } from '@/utils/fetchData';
import SubmitButton from '../Common/SubmitButton';
import { useSubmitForm } from '@/hooks/useSubmitForm';

interface FollowUpFormProps {
  oldFollowUp?: FollowUp;
  patientId: string;
  handler?: (followUp: FollowUp) => void;
  setModalOpen?: (state: boolean) => void;
}

export default function FollowUpForm({
  oldFollowUp,
  patientId,
  handler,
  setModalOpen,
}: FollowUpFormProps) {
  const { register, handleSubmit, reset } = useForm();
  const dataModifier = (data: any) => ({
    ...data,
    patientId,
  });

  const { onSubmit, isLoading } = useSubmitForm({
    entity: 'follow-ups',
    endpoint: oldFollowUp ? `/${oldFollowUp.id}` : '',
    oldEntity: oldFollowUp,
    returnEntity: 'followUp',
    handler,
    setModalOpen,
    dataModifier,
    reset,
  });

  const dateString = oldFollowUp?.date.toString();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Field
          fieldName="id"
          label="ID"
          placeholder="Id de la gesta"
          register={register}
          type="text"
          visible={false}
          defaultValue={oldFollowUp?.id}
        />
        <Field
          fieldName="date"
          label="Fecha"
          placeholder="Fecha del seguimiento"
          register={register}
          type="date"
          defaultValue={dateString?.split('T')[0]}
          required={true}
        />
        {oldFollowUp && (
          <>
            <FormControl>
              <FormLabel
                sx={(theme) => ({
                  '--FormLabel-color': theme.vars.palette.primary.plainColor,
                })}
              >
                Se presentó
              </FormLabel>
              <RadioGroup
                name="option"
                orientation="horizontal"
                defaultValue={oldFollowUp?.attended?.toString() || 'true'}
              >
                <Radio {...register('attended')} value={'true'} label="Si" />
                <Radio {...register('attended')} value={'false'} label="No" />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel
                sx={(theme) => ({
                  '--FormLabel-color': theme.vars.palette.primary.plainColor,
                })}
              >
                Tiene enfermedad
              </FormLabel>
              <RadioGroup
                name="option"
                orientation="horizontal"
                defaultValue={oldFollowUp?.hasDisease?.toString() || 'false'}
              >
                <Radio {...register('hasDisease')} value={'true'} label="Si" />
                <Radio {...register('hasDisease')} value={'false'} label="No" />
              </RadioGroup>
            </FormControl>
            <Field
              fieldName="recurrenceSite"
              label="Sitio de Recidiva"
              placeholder="Sitio de la recidiva ..."
              register={register}
              type="text"
              defaultValue={oldFollowUp?.recurrenceSite}
            />
            <FormControl>
              <FormLabel
                sx={(theme) => ({
                  '--FormLabel-color': theme.vars.palette.primary.plainColor,
                })}
              >
                Murio
              </FormLabel>
              <RadioGroup
                name="option"
                orientation="horizontal"
                defaultValue={oldFollowUp?.died?.toString() || 'false'}
              >
                <Radio {...register('died')} value={'true'} label="Si" />
                <Radio {...register('died')} value={'false'} label="No" />
              </RadioGroup>
            </FormControl>
            <Field
              fieldName="causeOfDeath"
              label="Causa de Muerte"
              placeholder="Causa de la muerte ..."
              register={register}
              type="text"
              defaultValue={oldFollowUp?.causeOfDeath}
            />
            <Field
              fieldName="observations"
              label="Observaciones"
              placeholder="Observaciones ..."
              register={register}
              type="text"
              defaultValue={oldFollowUp?.observations}
            />
          </>
        )}
      </Stack>
      <SubmitButton isLoading={isLoading}>
        {oldFollowUp ? 'Actualizar' : 'Agregar'}
      </SubmitButton>
    </form>
  );
}

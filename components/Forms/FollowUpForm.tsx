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

interface Props {
  buttonText: string;
  oldFollowUp?: FollowUp;
  patientId: string;
  handler?: (followUp: FollowUp) => void;
  setModalOpen: (state: boolean) => void;
}

export default function FollowUpForm({
  buttonText,
  oldFollowUp,
  patientId,
  handler,
  setModalOpen,
}: Props) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    data = { ...data, patientId };

    try {
      setIsLoading(true);
      const entity = 'follow-ups';
      const endpoint = oldFollowUp ? `/${oldFollowUp.id}` : '';
      const method = oldFollowUp ? 'PUT' : 'POST';
      const result = await fetchData(entity + endpoint, method, data);
      if (result.status === 200) reset();
      if (handler) handler(result.followUp);
      setModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const dateString = oldFollowUp?.date.toString();
  return (
    <Container isLoading={isLoading}>
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
          {buttonText !== 'Agregar' && (
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
                  <Radio
                    {...register('hasDisease')}
                    value={'true'}
                    label="Si"
                  />
                  <Radio
                    {...register('hasDisease')}
                    value={'false'}
                    label="No"
                  />
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
        <SubmitButton isLoading={isLoading}>{buttonText}</SubmitButton>
      </form>
    </Container>
  );
}

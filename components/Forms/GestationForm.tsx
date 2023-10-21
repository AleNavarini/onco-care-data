'use client';
import { Button, Sheet, Stack } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { Gestation } from '@prisma/client';
import Container from '../Common/Container';
import { fetchData } from '@/utils/fetchData';
import SubmitButton from '../Common/SubmitButton';
import { FieldConfig } from '@/types/FieldConfig';
import FormFieldsMapper from '../Common/FormFieldsMapper';

interface Props {
  patientId: string;
  gestation: Gestation | undefined;
}
export default function GestationForm({ patientId, gestation }: Props) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const fields = getFields(gestation);

  const onSubmit = async (data: any) => {
    data = { ...data, patientId };

    try {
      setIsLoading(true);
      const entity = 'gestations';
      const endpoint = gestation ? `/${gestation.id}` : '';
      const method = gestation ? 'PUT' : 'POST';
      const result = await fetchData(entity + endpoint, method, data);
      if (result.status === 200) reset();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container isLoading={isLoading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormFieldsMapper register={register} fields={fields} />
        <SubmitButton isLoading={isLoading}>Guardar</SubmitButton>
      </form>
    </Container>
  );
}

function getFields(gestation: Gestation | undefined): FieldConfig[] {
  return [
    {
      fieldName: 'births',
      label: 'Partos',
      placeholder: 'Cantidad de Partos',
      type: 'number',
      defaultValue: gestation?.births,
    },
    {
      fieldName: 'abortions',
      label: 'Abortos',
      placeholder: 'Cantidad de Abortos',
      type: 'number',
      defaultValue: gestation?.abortions,
    },
    {
      fieldName: 'cesareans',
      label: 'Cesareas',
      placeholder: 'Cantidad de Cesareas',
      type: 'number',
      defaultValue: gestation?.cesareans,
    },
  ];
}

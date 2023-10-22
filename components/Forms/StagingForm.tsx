import { Button, Sheet, Stack } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { Staging } from '@prisma/client';
import Container from '../Common/Container';
import { fetchData } from '@/utils/fetchData';
import SubmitButton from '../Common/SubmitButton';
import { FieldConfig } from '@/types/FieldConfig';
import FormFieldsMapper from '../Common/FormFieldsMapper';

interface Props {
  buttonText: string;
  oldStaging?: Staging;
  patientId: string;
  handler?: (staging: Staging) => void;
  setModalOpen: (state: boolean) => void;
}

export default function StagingForm({
  buttonText,
  oldStaging,
  patientId,
  handler,
  setModalOpen,
}: Props) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    data = { ...data, patientId: patientId };

    try {
      setIsLoading(true);
      const entity = 'stagings';
      const endpoint = oldStaging ? `/${oldStaging.id}` : '';
      const method = oldStaging ? 'PUT' : 'POST';
      const result = await fetchData(entity + endpoint, method, data);
      if (result.status === 200) reset();
      if (handler) handler(result.staging);
      setModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const dimensions = getContainerDimensions();
  const fields = getFields(oldStaging);

  return (
    <Container dimensions={dimensions} isLoading={isLoading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormFieldsMapper register={register} fields={fields} />
        <SubmitButton isLoading={isLoading}>{buttonText}</SubmitButton>
      </form>
    </Container>
  );
}

function getFields(oldStaging: Staging | undefined): FieldConfig[] {
  const dateString = oldStaging?.date.toString();

  return [
    {
      fieldName: 'id',
      label: 'ID',
      placeholder: 'Id de la gesta',
      type: 'text',
      visible: false,
      defaultValue: oldStaging?.id,
    },
    {
      fieldName: 'date',
      label: 'Fecha',
      placeholder: 'Fecha de la estadificacion',
      type: 'date',
      defaultValue: dateString
        ? dateString.split('T')[0]
        : new Date().toISOString().split('T')[0],
    },
    {
      fieldName: 'type',
      label: 'Tipo',
      placeholder: 'Tipo de Figo (quirurjica o clinica)',
      type: 'text',
      defaultValue: oldStaging?.type,
    },
    {
      fieldName: 'figo',
      label: 'FIGO',
      placeholder: 'Figo',
      type: 'text',
      defaultValue: oldStaging?.figo,
    },
  ];
}

function getContainerDimensions() {
  const width = {
    sm: '90%',
    md: '60%',
    lg: '50%',
    xl: '30%',
  };
  const dimensions = { width };
  return dimensions;
}

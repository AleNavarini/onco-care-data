import { Button, Sheet, Stack } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { Complication } from '@prisma/client';
import Container from '../Common/Container';
import { fetchData } from '@/utils/fetchData';
import FormFieldsMapper from '../Common/FormFieldsMapper';
import { FieldConfig } from '@/types/FieldConfig';
import SubmitButton from '../Common/SubmitButton';

interface Props {
  buttonText: string;
  oldComplication?: Complication;
  treatmentId: string;
  handler?: (complication: Complication) => void;
  setModalOpen: (state: boolean) => void;
}

export default function ComplicationForm({
  treatmentId,
  oldComplication,
  handler,
  setModalOpen,
  buttonText,
}: Props) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const fields = getFields(oldComplication);

  const onSubmit = async (data: any) => {
    data = { ...data, treatmentId: treatmentId };

    try {
      setIsLoading(true);
      const entity = 'complications';
      const endpoint = oldComplication ? `/${oldComplication.id}` : '';
      const method = oldComplication ? 'PUT' : 'POST';
      const result = await fetchData(entity + endpoint, method, data);

      if (result.status === 200) reset();
      if (handler) handler(result.complication);
      setModalOpen(false);
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
        <SubmitButton isLoading={isLoading}>{buttonText}</SubmitButton>
      </form>
    </Container>
  );
}

function getFields(oldComplication: Complication | undefined): FieldConfig[] {
  return [
    {
      fieldName: 'id',
      label: 'ID',
      placeholder: 'Id de la complicacion',
      type: 'text',
      visible: false,
      defaultValue: oldComplication?.id,
    },
    {
      fieldName: 'time',
      label: 'Tiempo',
      placeholder: 'Post o intra quirurjica',
      type: 'text',
      defaultValue: oldComplication?.time,
    },
    {
      fieldName: 'type',
      label: 'Tipo',
      placeholder: 'Tipo de complicacion',
      type: 'text',
      defaultValue: oldComplication?.type,
    },
    {
      fieldName: 'transfusions',
      label: 'Transfusiones',
      placeholder: 'Cant de transfusiones',
      type: 'text',
      defaultValue: oldComplication?.transfusions,
    },
  ];
}

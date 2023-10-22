import { Button, Sheet, Stack } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { TreatmentType } from '@prisma/client';
import Container from '../Common/Container';
import { fetchData } from '@/utils/fetchData';
import SubmitButton from '../Common/SubmitButton';
import { FieldConfig } from '@/types/FieldConfig';
import FormFieldsMapper from '../Common/FormFieldsMapper';

interface Props {
  buttonText: string;
  oldTreatmentType?: TreatmentType;
  handler?: (treatmentType: TreatmentType) => void;
  setModalOpen: (state: boolean) => void;
}

export default function TreatmentTypeForm({
  buttonText,
  setModalOpen,
  handler,
  oldTreatmentType,
}: Props) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const entity = 'treatment-types';
      const endpoint = oldTreatmentType ? `/${oldTreatmentType.id}` : '';
      const method = oldTreatmentType ? 'PUT' : 'POST';
      const result = await fetchData(entity + endpoint, method, data);

      if (result.status === 200) reset();
      if (handler) handler(result.treatmentType);

      setModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const dimensions = getContainerDimensions();
  const fields = getFields(oldTreatmentType);

  return (
    <Container dimensions={dimensions} isLoading={isLoading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormFieldsMapper register={register} fields={fields} />
        <SubmitButton isLoading={isLoading}>{buttonText}</SubmitButton>
      </form>
    </Container>
  );
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

function getFields(oldTreatmentType: TreatmentType | undefined): FieldConfig[] {
  return [
    {
      fieldName: 'id',
      label: 'ID',
      placeholder: 'Id del tipo de tratamiento',
      type: 'text',
      visible: false,
      defaultValue: oldTreatmentType?.id,
    },
    {
      fieldName: 'name',
      label: 'Nombre',
      placeholder: 'Nombre del tipo de tratamiento',
      type: 'text',
      required: true,
      defaultValue: oldTreatmentType?.name,
    },
  ];
}

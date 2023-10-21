import { Button, Sheet, Stack } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { PreviousSurgery } from '@prisma/client';
import Container from '../Common/Container';
import { fetchData } from '@/utils/fetchData';
import SubmitButton from '../Common/SubmitButton';
import { FieldConfig } from '@/types/FieldConfig';
import FormFieldsMapper from '../Common/FormFieldsMapper';

interface Props {
  buttonText: string;
  oldPreviousSurgery?: PreviousSurgery;
  patientId: string;
  addPreviousSurgery?: (previousSurgery: PreviousSurgery) => void;
  setModalOpen: (state: boolean) => void;
}

export default function PreviousSurgeryForm({
  buttonText,
  oldPreviousSurgery,
  patientId,
  addPreviousSurgery,
  setModalOpen,
}: Props) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    data = { ...data, patientId };
    if (data.id === '') delete data.id;

    try {
      setIsLoading(true);
      const entity = 'previous-surgeries';
      const endpoint = oldPreviousSurgery ? `/${oldPreviousSurgery.id}` : '';
      const method = oldPreviousSurgery ? 'PUT' : 'POST';
      const result = await fetchData(entity + endpoint, method, data);
      if (result.status === 200) reset();
      if (addPreviousSurgery) addPreviousSurgery(result.previousSurgery);
      setModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const dimensions = getContainerDimensions();
  const fields = getFields(oldPreviousSurgery)

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
  return { width };
}

function getFields(oldPreviousSurgery: PreviousSurgery | undefined): FieldConfig[] {
  return [
    {
      fieldName: 'id',
      label: 'ID',
      placeholder: 'Id de la cirugia',
      type: 'text',
      visible: false,
      defaultValue: oldPreviousSurgery?.id,
    },
    {
      fieldName: 'surgeryType',
      label: 'Tipo',
      placeholder: 'Tipo de cirguia',
      type: 'text',
      required: true,
      defaultValue: oldPreviousSurgery?.surgeryType,
    },
    {
      fieldName: 'observations',
      label: 'Observaciones',
      placeholder: 'Observaciones',
      type: 'text',
      defaultValue: oldPreviousSurgery?.observations,
    },
  ];
}
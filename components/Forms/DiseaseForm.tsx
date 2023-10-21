import { Button, Sheet, Stack } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { Disease } from '@prisma/client';
import Container from '../Common/Container';
import { fetchData } from '@/utils/fetchData';
import SubmitButton from '../Common/SubmitButton';
import { FieldConfig } from '@/types/FieldConfig';
import FormFieldsMapper from '../Common/FormFieldsMapper';

interface Props {
  buttonText: string;
  oldDisease?: Disease;
  addDisease?: (disease: Disease) => void;
  setModalOpen: (state: boolean) => void;
}

export default function DiseaseForm({ buttonText, oldDisease, addDisease, setModalOpen }: Props) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const entity = "diseases"
      const endpoint = oldDisease ? `/${oldDisease.id}` : '';
      const method = oldDisease ? 'PUT' : 'POST';
      const result = await fetchData(entity + endpoint, method, data)
      if (result.status === 200) reset();
      if (addDisease) addDisease(result.disease);
      setModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const dimensions = getContainerDimensions();
  const fields = getFields(oldDisease)
  return (

    <Container dimensions={dimensions} isLoading={isLoading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormFieldsMapper register={register} fields={fields} />
        <SubmitButton isLoading={isLoading}>
          {buttonText}
        </SubmitButton>
      </form>
    </Container>
  );
}

function getFields(oldDisease: Disease | undefined): FieldConfig[] {
  return [
    {
      fieldName: 'id',
      label: 'ID',
      placeholder: 'Id de la enfermedad',
      type: 'text',
      visible: false,
      defaultValue: oldDisease?.id,
    },
    {
      fieldName: 'name',
      label: 'Nombre',
      placeholder: 'Nombre de la enfermedad',
      type: 'text',
      required: true,
      defaultValue: oldDisease?.name,
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


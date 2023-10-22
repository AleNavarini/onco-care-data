import { Button, Sheet, Stack } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { Symptom } from '@prisma/client';
import Container from '../Common/Container';
import { fetchData } from '@/utils/fetchData';
import SubmitButton from '../Common/SubmitButton';
import { FieldConfig } from '@/types/FieldConfig';
import FormFieldsMapper from '../Common/FormFieldsMapper';

interface Props {
  buttonText: string;
  oldSymptom?: Symptom;
  patientId: string;
  addSymptom?: (symptom: Symptom) => void;
  setModalOpen: (state: boolean) => void;
}

export default function SymptomForm({
  buttonText,
  patientId,
  setModalOpen,
  addSymptom,
  oldSymptom,
}: Props) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    data = { ...data, patientId };
    if (data.id === '') delete data.id;

    try {
      setIsLoading(true);
      const entity = 'symptoms';
      const endpoint = oldSymptom ? `/${oldSymptom.id}` : '';
      const method = oldSymptom ? 'PUT' : 'POST';
      const result = await fetchData(entity + endpoint, method, data);
      if (result.status === 200) reset();
      if (addSymptom) addSymptom(result.symptom);
      setModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const dimensions = getContainerDimensions();
  const fields = getFields(oldSymptom);

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

function getFields(oldSymptom: Symptom | undefined): FieldConfig[] {
  return [
    {
      fieldName: 'id',
      label: 'ID',
      placeholder: 'Id del sintoma',
      type: 'text',
      visible: false,
      defaultValue: oldSymptom?.id,
    },
    {
      fieldName: 'name',
      label: 'Nombre',
      placeholder: 'Nombre del sintoma',
      type: 'text',
      required: true,
      defaultValue: oldSymptom?.name,
    },
    {
      fieldName: 'value',
      label: 'Valor',
      placeholder: 'Valor del sintoma ... (opcional)',
      type: 'text',
      defaultValue: oldSymptom?.value,
    },
  ];
}

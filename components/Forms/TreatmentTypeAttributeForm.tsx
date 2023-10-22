import { Button, Sheet, Stack } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { TreatmentTypeAttribute } from '@prisma/client';
import Container from '../Common/Container';
import { fetchData } from '@/utils/fetchData';
import SubmitButton from '../Common/SubmitButton';
import { FieldConfig } from '@/types/FieldConfig';
import FormFieldsMapper from '../Common/FormFieldsMapper';

interface Props {
  buttonText: string;
  oldTreatmentTypeAttribute?: TreatmentTypeAttribute;
  treatmentTypeId: string;
  treatmentId?: string;
  handler?: (treatmentTypeAttribute: TreatmentTypeAttribute) => void;
  setModalOpen: (state: boolean) => void;
}

export default function TreatmentTypeAttributeForm({
  buttonText,
  setModalOpen,
  treatmentTypeId,
  handler,
  oldTreatmentTypeAttribute,
  treatmentId,
}: Props) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    data = { ...data, treatmentTypeId };

    try {
      setIsLoading(true);
      const entity = 'treatment-types-attributes';
      const endpoint = oldTreatmentTypeAttribute
        ? `/${oldTreatmentTypeAttribute.id}`
        : '';
      const method = oldTreatmentTypeAttribute ? 'PUT' : 'POST';
      const result = await fetchData(entity + endpoint, method, data);
      if (result.status === 200) reset();
      if (handler) handler(result.treatmentTypeAttribute);
      setModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const dimensions = getContainerDimensions();
  const fields = getFields(oldTreatmentTypeAttribute, treatmentId);

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

function getFields(
  oldTreatmentTypeAttribute: TreatmentTypeAttribute | undefined,
  treatmentId: string | undefined,
): FieldConfig[] {
  const fields: FieldConfig[] = [
    {
      fieldName: 'id',
      label: 'ID',
      placeholder: 'Id del atributo',
      type: 'text',
      visible: false,
      defaultValue: oldTreatmentTypeAttribute?.id,
    },
    {
      fieldName: 'name',
      label: 'Nombre',
      placeholder: 'Nombre del atributo',
      type: 'text',
      required: true,
      defaultValue: oldTreatmentTypeAttribute?.name,
    },
  ];

  if (treatmentId) {
    fields.push({
      fieldName: 'value',
      label: 'Valor',
      placeholder: 'Valor del atributo ...',
      type: 'text',
      defaultValue: oldTreatmentTypeAttribute?.value,
    });
  }

  return fields;
}

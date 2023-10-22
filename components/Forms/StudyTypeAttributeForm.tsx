import { Button, Sheet, Stack } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { StudyTypeAttribute } from '@prisma/client';
import Container from '../Common/Container';
import { fetchData } from '@/utils/fetchData';
import SubmitButton from '../Common/SubmitButton';
import { FieldConfig } from '@/types/FieldConfig';
import FormFieldsMapper from '../Common/FormFieldsMapper';

interface Props {
  buttonText: string;
  oldStudyTypeAttribute?: StudyTypeAttribute;
  studyTypeId: string;
  studyId?: string;
  handler?: (riskFactor: StudyTypeAttribute) => void;
  setModalOpen: (state: boolean) => void;
}

export default function StudyTypeAttributeForm({
  buttonText,
  setModalOpen,
  studyTypeId,
  handler,
  oldStudyTypeAttribute,
  studyId,
}: Props) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    data = { ...data, studyTypeId };

    try {
      setIsLoading(true);
      const entity = 'study-types-attributes';
      const endpoint = oldStudyTypeAttribute
        ? `/${oldStudyTypeAttribute.id}`
        : '';
      const method = oldStudyTypeAttribute ? 'PUT' : 'POST';
      const result = await fetchData(entity + endpoint, method, data);
      if (result.status === 200) reset();
      if (handler) handler(result.studyTypeAttribute);
      setModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const fields = getFields(oldStudyTypeAttribute, studyId);

  return (
    <Container isLoading={isLoading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormFieldsMapper register={register} fields={fields} />
        <SubmitButton isLoading={isLoading}>{buttonText}</SubmitButton>
      </form>
    </Container>
  );
}

function getFields(
  oldStudyTypeAttribute: StudyTypeAttribute | undefined,
  studyId: string | undefined,
): FieldConfig[] {
  const fields: FieldConfig[] = [
    {
      fieldName: 'id',
      label: 'ID',
      placeholder: 'Id del atributo',
      type: 'text',
      visible: false,
      defaultValue: oldStudyTypeAttribute?.id,
    },
    {
      fieldName: 'name',
      label: 'Nombre',
      placeholder: 'Nombre del atributo',
      type: 'text',
      required: true,
      defaultValue: oldStudyTypeAttribute?.name,
    },
  ];

  if (studyId) {
    fields.push({
      fieldName: 'value',
      label: 'Valor',
      placeholder: 'Valor del atributo ...',
      type: 'text',
      defaultValue: oldStudyTypeAttribute?.value,
    });
  }

  return fields;
}

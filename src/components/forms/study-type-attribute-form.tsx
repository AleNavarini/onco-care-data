import { useForm } from 'react-hook-form';
import { StudyTypeAttribute } from '@prisma/client';
import { FieldConfig } from '@/types/field-config';
import Form from '../common/form';
import { useSubmitForm } from '@/hooks/use-submit-form';

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

  const dataModifier = (data: any) => ({
    ...data,
    studyTypeId,
  });

  const { onSubmit, isLoading } = useSubmitForm({
    entity: 'study-types-attributes',
    oldEntity: oldStudyTypeAttribute,
    returnEntity: 'studyTypeAttribute',
    dataModifier,
    reset,
    setModalOpen,
    handler,
  });

  const fields = getFields(oldStudyTypeAttribute, studyId);

  return (
    <Form
      buttonText={buttonText}
      fields={fields}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      onSubmit={onSubmit}
      register={register}
    />
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

import { useForm } from 'react-hook-form';
import { Complication } from '@prisma/client';
import { FieldConfig } from '@/types/field-config';
import Form from '../common/form';
import { useSubmitForm } from '@/hooks/use-submit-form';

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
  const fields = getFields(oldComplication);

  const dataModifier = (data: any) => ({
    ...data,
    treatmentId,
  });

  const { onSubmit, isLoading } = useSubmitForm({
    entity: 'complications',
    endpoint: oldComplication ? `/${oldComplication.id}` : '',
    oldEntity: oldComplication,
    returnEntity: 'complication',
    handler,
    dataModifier,
    setModalOpen,
    reset,
  });

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

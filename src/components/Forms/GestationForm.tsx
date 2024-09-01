'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Gestation } from '@prisma/client';
import { FieldConfig } from '@/types/FieldConfig';
import Form from '../Common/Form';
import { useSubmitForm } from '@/hooks/useSubmitForm';

interface Props {
  patientId: string;
  gestation: Gestation | undefined;
}
export default function GestationForm({
  patientId,
  gestation: initialGestation,
}: Props) {
  const { register, handleSubmit, reset } = useForm();
  const [gestation, setGestation] = useState(initialGestation);
  const [fields, setFields] = useState<FieldConfig[]>(
    getFields(initialGestation),
  );

  useEffect(() => {
    setFields(getFields(gestation));
  }, [gestation]);

  const dataModifier = (data: any) => {
    if (data.births === '') data.births = 0;
    if (data.abortions === '') data.abortions = 0;
    if (data.cesareans === '') data.cesareans = 0;

    return {
      ...data,
      patientId,
    };
  };

  const { onSubmit, isLoading } = useSubmitForm({
    entity: 'gestations',
    oldEntity: gestation,
    returnEntity: 'gestation',
    dataModifier,
    reset,
    handler: setGestation,
    patientId,
  });

  return (
    <Form
      buttonText={'Guardar'}
      fields={fields}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      onSubmit={onSubmit}
      register={register}
      dimensions={getContainerDimensions()}
    />
  );
}

function getFields(gestation: Gestation | undefined): FieldConfig[] {
  return [
    {
      fieldName: 'births',
      label: 'Partos',
      placeholder: 'Cantidad o 0 por defecto',
      type: 'number',
      defaultValue: gestation?.births,
    },
    {
      fieldName: 'abortions',
      label: 'Abortos',
      placeholder: 'Cantidad o 0 por defecto',
      type: 'number',
      defaultValue: gestation?.abortions,
    },
    {
      fieldName: 'cesareans',
      label: 'Cesareas',
      placeholder: 'Cantidad o 0 por defecto',
      type: 'number',
      defaultValue: gestation?.cesareans,
    },
  ];
}

function getContainerDimensions() {
  return { width: '100%' };
}

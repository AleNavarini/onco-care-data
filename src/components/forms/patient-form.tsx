import { Select, Option, FormControl, FormLabel } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SubmitButton from '../common/submit-button';
import { FieldConfig } from '@/types/field-config';
import FormFieldsMapper from '../common/form-fields-mapper';
import { useSubmitForm } from '@/hooks/use-submit-form';
import { FullPatient } from '@/types/full-patient';

interface Props {
  oldPatient?: FullPatient;
  handler?: (patient: FullPatient) => void;
  setModalOpen: (state: boolean) => void;
}

export default function PatientForm({
  oldPatient,
  handler,
  setModalOpen,
}: Props) {
  const buttonText = oldPatient ? 'Actualizar' : 'Agregar';
  const { register, handleSubmit, reset } = useForm();
  const [selectedStatus, setSelectedStatus] = useState(
    oldPatient ? oldPatient.status : 'active',
  );
  const handleChange = async (_e: null, value: string) =>
    setSelectedStatus(value);

  const dataModifier = (data: any) => ({
    ...data,
    status: selectedStatus,
  });

  const { onSubmit, isLoading } = useSubmitForm({
    entity: 'patients',
    oldEntity: oldPatient,
    returnEntity: 'patient',
    dataModifier,
    reset,
    handler,
    setModalOpen,
  });

  const fields = getFields(oldPatient);
  const statuses = getStatuses();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormFieldsMapper register={register} fields={fields} />
      <FormControl>
        <FormLabel
          sx={(theme) => ({
            '--FormLabel-color': '#fff',
          })}
        >
          Estado
        </FormLabel>
        <Select
          // @ts-ignore
          onChange={handleChange}
          sx={{
            width: '100%',
            color: 'white',
            background: 'transparent',
            ':hover': {
              background: 'transparent',
              color: 'white',
            },
          }}
          placeholder="Choose one…"
          defaultValue={'active'}
        >
          {statuses.map((status: any) => (
            <Option key={status.text} value={status.value}>
              {status.text}
            </Option>
          ))}
        </Select>
      </FormControl>
      <SubmitButton isLoading={isLoading}>{buttonText}</SubmitButton>
    </form>
  );
}

function getStatuses() {
  return [
    { text: 'Activa', value: 'active' },
    { text: 'En seguimiento', value: 'following' },
  ];
}

function getFields(oldPatient: FullPatient | undefined): FieldConfig[] {
  return [
    {
      fieldName: 'id',
      label: 'ID',
      placeholder: 'Id del paciente',
      type: 'text',
      visible: false,
      defaultValue: oldPatient?.id,
    },
    {
      fieldName: 'name',
      label: 'Nombre',
      placeholder: 'Nombre del paciente',
      type: 'text',
      required: true,
      defaultValue: oldPatient?.name,
    },
    {
      fieldName: 'dni',
      label: 'DNI',
      placeholder: 'DNI',
      type: 'text',
      required: true,
      defaultValue: oldPatient?.dni,
    },
    {
      fieldName: 'dateOfBirth',
      label: 'Fecha de nacimiento',
      placeholder: 'Fecha de nacimiento',
      type: 'date',
      defaultValue: oldPatient?.dateOfBirth?.split('T')[0],
    },
    {
      fieldName: 'phone',
      label: 'Teléfono',
      placeholder: 'Teléfono',
      type: 'text',
      defaultValue: oldPatient?.phone,
    },
    {
      fieldName: 'email',
      label: 'Email',
      placeholder: 'Email',
      type: 'email',
      defaultValue: oldPatient?.email,
    },
    {
      fieldName: 'address',
      label: 'Domicilio',
      placeholder: 'Domicilio',
      type: 'text',
      defaultValue: oldPatient?.address,
    },
    {
      fieldName: 'healthInsurance',
      label: 'Obra social',
      placeholder: 'Obra social',
      type: 'text',
      defaultValue: oldPatient?.healthInsurance,
    },
    {
      fieldName: 'clinicHistory',
      label: 'Historia Clinica',
      placeholder: 'Historia clínica',
      type: 'number',
      defaultValue: oldPatient?.clinicHistory,
    },
  ];
}

import {
  Button,
  Select,
  Option,
  Stack,
  FormControl,
  FormLabel,
} from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { FullPatient } from '../Dashboards/PatientsDashboard';
import Container from '../Common/Container';
import { fetchData } from '@/utils/fetchData';
import SubmitButton from '../Common/SubmitButton';
import { FieldConfig } from '@/types/FieldConfig';
import FormFieldsMapper from '../Common/FormFieldsMapper';
import { useSubmitForm } from '@/hooks/useSubmitForm';

interface Props {
  buttonText: string;
  oldPatient?: FullPatient;
  addPatient?: (patient: FullPatient) => void;
  setModalOpen: (state: boolean) => void;
}

export default function PatientForm({
  buttonText,
  oldPatient,
  addPatient,
  setModalOpen,
}: Props) {
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
    handler: addPatient,
    setModalOpen,
  });

  const dimensions = getContainerDimensions();
  const fields = getFields(oldPatient);
  const statuses = getStatuses();

  return (
    <Container dimensions={dimensions} isLoading={isLoading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormFieldsMapper register={register} fields={fields} />
        <FormControl>
          <FormLabel
            sx={(theme) => ({
              '--FormLabel-color': theme.vars.palette.primary.plainColor,
            })}
          >
            Estado
          </FormLabel>
          <Select
            // @ts-ignore
            onChange={handleChange}
            sx={{
              width: {
                sm: 'auto',
                md: '20dvw',
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
    </Container>
  );

  function getContainerDimensions() {
    const width = {
      xs: '90%',
      sm: '90%',
      md: '80%',
      lg: '50%',
      xl: '30%',
    };
    const maxHeight = {
      sm: '90%',
      md: '90%',
      lg: '100%',
      xl: '100%',
    };
    return { width, maxHeight };
  }
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

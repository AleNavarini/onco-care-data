import { Select, Option, FormControl, FormLabel } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SubmitButton from '../common/submit-button';
import { FieldConfig } from '@/types/field-config';
import FormFieldsMapper from '../common/form-fields-mapper';
import { useSubmitForm } from '@/hooks/use-submit-form';
import { FullPatient } from '@/types/full-patient';
import { z } from 'zod';
import ZodForm from '@/components/forms/zod-form/zod-form';
interface Props {
  oldPatient?: FullPatient;
  setModalOpen: (state: boolean) => void;
}

export default function PatientForm({ oldPatient, setModalOpen }: Props) {
  const hiddenFields = ['id'];
  const formSchema = z.object({
    id: z.string().describe('Id').optional(),
    name: z.string().describe('Nombre'),
    dni: z.string().describe('DNI'),
    dateOfBirth: z.string().date().describe('Fecha de nacimiento').optional(),
    phone: z.string().describe('Teléfono').optional(),
    email: z.string().describe('Email').optional(),
    address: z.string().describe('Domicilio').optional(),
    healthInsurance: z.string().describe('Obra social').optional(),
    clinicHistory: z.number().describe('Historia Clinica').optional(),
    status: z.enum(['Activa', 'En Seguimiento']).describe('Estado'),
  });

  return (
    <ZodForm
      key={'patient-form'}
      formSchema={formSchema}
      hiddenFields={hiddenFields}
      endpoint="patients"
      entity={oldPatient}
      closeModal={setModalOpen}
    />
  );
}

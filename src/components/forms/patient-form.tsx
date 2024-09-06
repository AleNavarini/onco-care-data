import { FullPatient } from '@/types/full-patient';
import { z } from 'zod';
import ZodForm from '@/components/forms/zod-form/zod-form';
import { reverseMapStatus } from '@/utils';
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
  if (oldPatient) {
    oldPatient.dateOfBirth = oldPatient.dateOfBirth
      ? new Date(oldPatient.dateOfBirth).toISOString().split('T')[0]
      : null;
    const mappedStatus = reverseMapStatus(oldPatient.status);
    oldPatient.status = mappedStatus;
  }
  return (
    <ZodForm
      key={'patient-form'}
      formSchema={formSchema}
      hiddenFields={hiddenFields}
      endpoint="/v1/patients"
      entity={oldPatient}
      closeModal={setModalOpen}
      customMutate="/api/v1/patients"
    />
  );
}

import { RiskFactor } from '@prisma/client';
import { z } from 'zod';
import ZodForm from './zod-form/zod-form';
import '@/lib/big-int-extensions';

interface Props {
  patientId?: string;
  diseaseId?: string;
  oldRiskFactor?: Partial<RiskFactor>;
  closeModal?: () => void;
  customMutate?: string;
}

export default function RiskFactorForm({
  oldRiskFactor,
  closeModal,
  patientId,
  diseaseId,
  customMutate,
}: Props) {
  let formSchema = z.object({
    id: z.string().describe('Id').optional(),
    name: z.string().describe('Nombre'),
  });
  if (oldRiskFactor) {
    patientId = oldRiskFactor.patientId && oldRiskFactor.patientId.toString();
    diseaseId = oldRiskFactor.diseaseId && oldRiskFactor.diseaseId.toString();
  } else {
    oldRiskFactor = {};
  }
  if (patientId) {
    formSchema = formSchema.extend({
      patientId: z.bigint().describe('Id del paciente').optional(),
      value: z.string().describe('Valor del factor de riesgo'),
    });
    oldRiskFactor.patientId = BigInt(patientId);
  }

  if (diseaseId) {
    formSchema = formSchema.extend({
      diseaseId: z.bigint().describe('Id de la enfermedad').optional(),
    });
    oldRiskFactor.diseaseId = BigInt(diseaseId);
  }

  const hiddenFields = ['id', 'patientId', 'diseaseId'];

  return (
    <ZodForm
      key={'risk-factor-form'}
      formSchema={formSchema}
      hiddenFields={hiddenFields}
      endpoint="risk-factors"
      entity={oldRiskFactor}
      closeModal={closeModal}
      customMutate={customMutate}
    />
  );
}

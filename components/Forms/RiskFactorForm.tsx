import { useForm } from 'react-hook-form';
import { RiskFactor } from '@prisma/client';
import { FieldConfig } from '@/types/FieldConfig';
import { useSubmitForm } from '@/hooks/useSubmitForm';
import NewForm from '../Common/NewForm';

interface Props {
  patientId?: string;
  diseaseId?: string;
  oldRiskFactor?: RiskFactor;
  handler?: (riskFactor: RiskFactor) => void;
  setModalOpen?: (state: boolean) => void;
}

export default function RiskFactorForm({
  patientId,
  diseaseId,
  oldRiskFactor,
  handler,
  setModalOpen,
}: Props) {
  const { register, handleSubmit, reset } = useForm();

  const dataModifier = (data: any) => {
    if (patientId) data = { ...data, patientId };
    if (diseaseId) data = { ...data, diseaseId };
    return data;
  };

  const { onSubmit, isLoading } = useSubmitForm({
    entity: 'risk-factors',
    oldEntity: oldRiskFactor,
    returnEntity: 'riskFactor',
    dataModifier,
    reset,
    setModalOpen,
    handler,
  });

  const fields = getFields(oldRiskFactor);

  return (
    <NewForm
      fields={fields}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      onSubmit={onSubmit}
      register={register}
      oldEntity={oldRiskFactor}
    />
  );
}

function getFields(oldRiskFactor: RiskFactor | undefined): FieldConfig[] {
  const fields: FieldConfig[] = [
    {
      fieldName: 'id',
      label: 'ID',
      placeholder: 'Id del factor de riesgo',
      type: 'text',
      visible: false,
      defaultValue: oldRiskFactor?.id,
    },
    {
      fieldName: 'name',
      label: 'Nombre',
      placeholder: 'Nombre del factor del riesgo',
      type: 'text',
      required: true,
      defaultValue: oldRiskFactor?.name,
    },
  ];

  if (oldRiskFactor?.patientId) {
    fields.push({
      fieldName: 'value',
      label: 'Valor',
      placeholder: 'Valor del factor de riesgo ...',
      type: 'text',
      defaultValue: oldRiskFactor?.value,
    });
  }

  return fields;
}

import { Stack } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { RiskFactor } from '@prisma/client';
import Container from '../Common/Container';
import { fetchData } from '@/utils/fetchData';
import SubmitButton from '../Common/SubmitButton';
import { FieldConfig } from '@/types/FieldConfig';
import FormFieldsMapper from '../Common/FormFieldsMapper';

interface Props {
  buttonText: string;
  oldRiskFactor?: RiskFactor;
  patientId?: string;
  diseaseId?: string;
  handler?: (riskFactor: RiskFactor) => void;
  setModalOpen: (state: boolean) => void;
}

export default function RiskFactorForm({
  buttonText,
  oldRiskFactor,
  patientId,
  diseaseId,
  handler,
  setModalOpen,
}: Props) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    if (patientId) data = { ...data, patientId };
    if (diseaseId) data = { ...data, diseaseId };

    try {
      setIsLoading(true);
      const entity = 'risk-factors';
      const endpoint = oldRiskFactor ? `/${oldRiskFactor.id}` : '';
      const method = oldRiskFactor ? 'PUT' : 'POST';
      const result = await fetchData(entity + endpoint, method, data);
      if (result.status === 200) reset();
      if (handler) handler(result.riskFactor);
      setModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const dimensions = getContainerDimensions();
  const fields = getFields(oldRiskFactor, patientId);

  return (
    <Container dimensions={dimensions} isLoading={isLoading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormFieldsMapper register={register} fields={fields} />
        <SubmitButton isLoading={isLoading}>{buttonText}</SubmitButton>
      </form>
    </Container>
  );
}

function getContainerDimensions() {
  const width = {
    sm: '90%',
    md: '60%',
    lg: '50%',
    xl: '30%',
  };
  return { width };
}

function getFields(
  oldRiskFactor: RiskFactor | undefined,
  patientId: string | undefined,
): FieldConfig[] {
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

  if (patientId) {
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

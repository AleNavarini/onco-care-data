import { Button, LinearProgress, Sheet, Stack } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { RiskFactor } from '@prisma/client';
import Container from '../Common/Container';

interface Props {
  buttonText: string;
  oldRiskFactor?: RiskFactor;
  patientId?: string;
  diseaseId?: string;
  handler?: (riskFactor: RiskFactor) => void;
  setModalOpen: (state: boolean) => void;
}

export default function RiskFactorForm(props: Props) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    if (props.patientId) {
      data = { ...data, patientId: props.patientId };
    }

    if (props.diseaseId) {
      data = { ...data, diseaseId: props.diseaseId };
    }

    try {
      setIsLoading(true);
      const endpoint = props.oldRiskFactor ? `/${props.oldRiskFactor.id}` : '';
      const response = await fetch(`/api/risk-factors${endpoint}`, {
        method: props.oldRiskFactor ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.status === 200) reset();
      if (props.handler) {
        props.handler(result.riskFactor);
      }
      props.setModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: {
          sm: '90%',
          md: '60%',
          lg: '50%',
          xl: '30%',
        },
        p: 5,
        borderRadius: 'md',
      }}
    >
      <Container isLoading={isLoading}>

        <form onSubmit={handleSubmit(onSubmit)}>

          <Stack spacing={2}>
            <Field
              fieldName="id"
              label="ID"
              placeholder="Id del factor de riesgo"
              register={register}
              type="text"
              visible={false}
              defaultValue={props.oldRiskFactor?.id}
            />
            <Field
              fieldName="name"
              label="Nombre"
              placeholder="Nombre del factor del riesgo"
              register={register}
              type="text"
              required={true}
              defaultValue={props.oldRiskFactor?.name}
            />
            {props.patientId && (
              <Field
                fieldName="value"
                label="Valor"
                placeholder="Valor del factor de riesgo ..."
                register={register}
                type="text"
                defaultValue={props.oldRiskFactor?.value}
              />
            )}
          </Stack>
          <Button
            loading={isLoading}
            sx={{
              my: 2,
              width: '100%',
            }}
            variant="solid"
            type="submit"
          >
            {props.buttonText}
          </Button>
        </form>
      </Container>
    </Sheet>
  );
}

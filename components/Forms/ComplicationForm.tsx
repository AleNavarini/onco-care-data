import { Button, Sheet, Stack } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { Complication } from '@prisma/client';
import Container from '../Common/Container';

interface Props {
  buttonText: string;
  oldComplication?: Complication;
  treatmentId: string;
  handler?: (complication: Complication) => void;
  setModalOpen: (state: boolean) => void;
}

export default function ComplicationForm(props: Props) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    data = { ...data, treatmentId: props.treatmentId };

    try {
      setIsLoading(true);
      const endpoint = props.oldComplication
        ? `/${props.oldComplication.id}`
        : '';
      const response = await fetch(`/api/complications${endpoint}`, {
        method: props.oldComplication ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.status === 200) reset();
      if (props.handler) props.handler(result.complication);
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
              placeholder="Id de la complicacion"
              register={register}
              type="text"
              visible={false}
              defaultValue={props.oldComplication?.id}
            />
            <Field
              fieldName="time"
              label="Tiempo"
              placeholder="Post o intra quirurjica"
              register={register}
              type="text"
              defaultValue={props.oldComplication?.time}
            />
            <Field
              fieldName="type"
              label="Tipo"
              placeholder="Tipo de complicacion"
              register={register}
              type="text"
              defaultValue={props.oldComplication?.type}
            />
            <Field
              fieldName="transfusions"
              label="Transfusiones"
              placeholder="Cant de transfusiones"
              register={register}
              type="text"
              defaultValue={props.oldComplication?.transfusions}
            />
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

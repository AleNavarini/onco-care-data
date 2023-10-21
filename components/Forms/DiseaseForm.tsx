import { Button, Sheet, Stack } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { Disease } from '@prisma/client';
import Container from '../Common/Container';

interface Props {
  buttonText: string;
  oldDisease?: Disease;
  addDisease?: (disease: Disease) => void;
  setModalOpen: (state: boolean) => void;
}

export default function DiseaseForm(props: Props) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const endpoint = props.oldDisease ? `/${props.oldDisease.id}` : '';
      const response = await fetch(`/api/diseases${endpoint}`, {
        method: props.oldDisease ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.status === 200) reset();
      if (props.addDisease) {
        props.addDisease(result.disease);
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
              placeholder="Id de la enfermedad"
              register={register}
              type="text"
              visible={false}
              defaultValue={props.oldDisease?.id}
            />
            <Field
              fieldName="name"
              label="Nombre"
              placeholder="Nombre de la enfemedad"
              register={register}
              type="text"
              required={true}
              defaultValue={props.oldDisease?.name}
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

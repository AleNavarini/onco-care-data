'use client';
import { Box, Button, LinearProgress, Sheet, Stack } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Field from './Field';
import { Gestation } from '@prisma/client';
import Container from '../Common/Container';

export default function GestationForm({
  patientId,
  gestation,
}: {
  patientId: string;
  gestation: Gestation | null;
}) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    data = { ...data, patientId: patientId };

    try {
      setIsLoading(true);
      const endpoint = gestation ? `/${gestation.id}` : '';
      const response = await fetch(`/api/gestations${endpoint}`, {
        method: gestation ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.status === 200) reset();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container isLoading={isLoading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Sheet
          sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 'md',
            px: 2,
            py: 1,
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}
        >
          <Stack spacing={2}>
            <Field
              fieldName="births"
              label="Partos"
              register={register}
              type="number"
              defaultValue={gestation?.births}
            />
            <Field
              fieldName="abortions"
              label="Abortos"
              register={register}
              type="number"
              defaultValue={gestation?.abortions}
            />
            <Field
              fieldName="cesareans"
              label="Cesareas"
              register={register}
              type="number"
              defaultValue={gestation?.cesareans}
            />

            <Button
              loading={isLoading}
              sx={{
                my: 2,
                width: '100%',
              }}
              variant="solid"
              type="submit"
            >
              Guardar
            </Button>
          </Stack>
        </Sheet>
      </form>
    </Container>
  );
}

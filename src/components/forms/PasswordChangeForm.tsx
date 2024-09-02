'use client';
import { Button, FormControl, FormLabel, Input } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Container from '../common/Container';
import { fetchData } from '@/utils/fetchData';

export default function PasswordChangeForm() {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const entity = 'profile';
      const method = 'PUT';
      const result = await fetchData(entity, method, data);
      if (result.status === 204) reset();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container isLoading={isLoading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          sx={{
            display: 'flex',
            margin: 'auto',
            width: '100%',
          }}
        >
          <FormLabel
            sx={(theme) => ({
              '--FormLabel-color': theme.vars.palette.primary.plainColor,
            })}
          >
            Cambiar Contraseña
          </FormLabel>
          <Input
            sx={{
              pr: 0,
            }}
            {...register('changedPassword')}
            type="password"
            placeholder="Cambia tu contraseña"
            endDecorator={
              <Button
                sx={{
                  p: 2,
                  m: 0,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
                type="submit"
                loading={isLoading}
                loadingIndicator="Cargando…"
                variant="solid"
              >
                Cambiar
              </Button>
            }
          />
        </FormControl>
      </form>
    </Container>
  );
}

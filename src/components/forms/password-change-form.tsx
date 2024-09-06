'use client';
import { fetchData } from '@/utils/fetch-data';
import { FormLabel, FormControl, FormField, FormItem, Form } from '../ui/form';
import { Input } from '../ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';

export default function PasswordChangeForm() {
  const formSchema = z.object({
    password: z.string().min(8).max(128),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const entity = 'profile';
      const method = 'PUT';
      const result = await fetchData(entity, method, values);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 w-full "
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input placeholder="Contraseña" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Cambiar</Button>
      </form>
    </Form>
  );
}

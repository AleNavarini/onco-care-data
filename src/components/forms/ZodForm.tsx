'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z, ZodObject, ZodTypeAny } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { fetchData } from '@/utils/fetch-data';
import { mutate } from 'swr';

interface Props {
  formSchema: ZodObject<{ [key: string]: ZodTypeAny }>;
  hiddenFields?: string[];
  entity?: Partial<z.infer<ZodObject<{ [key: string]: ZodTypeAny }>>>;
  endpoint?: string;
  closeModal: (state: boolean) => void;
}

export default function ZodForm({
  formSchema,
  hiddenFields = [],
  entity,
  endpoint = '',
  closeModal,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: entity || {},
  });

  const formFields = Object.keys(formSchema.shape).map((fieldName) => {
    const isHidden = hiddenFields.includes(fieldName);
    const fieldSchema = formSchema.shape[fieldName];
    const fieldLabel = fieldSchema.description || fieldName;

    return (
      <FormField
        key={fieldName}
        control={form.control}
        name={fieldName}
        render={({ field }) => (
          <FormItem className={isHidden ? 'hidden' : ''}>
            <FormLabel>{fieldLabel}</FormLabel>
            <FormControl>
              <Input placeholder={fieldLabel} {...field} />
            </FormControl>
            <FormDescription>Ingrese su {fieldLabel}.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const method = entity ? 'PUT' : 'POST';
    if (endpoint === '') endpoint = entity ? `/${entity.id}` : '';
    const result = await fetchData(endpoint, method, values);
    mutate(`api/${endpoint}`, null);
    closeModal(true);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {formFields}
        <Button type="submit">{entity ? 'Actualizar' : 'Agregar'}</Button>
      </form>
    </Form>
  );
}

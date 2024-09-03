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
import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import Spinner from '../ui/spinner';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setLoading(true);
    setError(null);

    const method = entity ? 'PUT' : 'POST';
    const baseUrl = 'api';
    let finalEndpoint = '';
    if (entity?.id) finalEndpoint = `${endpoint}/${entity.id}`;
    else finalEndpoint = `${endpoint}`;
    const url = `${baseUrl}/${finalEndpoint}`;
    const mutatedEndpoint = baseUrl + '/' + endpoint;

    try {
      await mutate(
        url,
        async (data) => {
          const response = await fetch(url, {
            method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });

          if (!response.ok) {
            throw new Error('Failed to submit data');
          }

          const result = await response.json();

          if (result.success) {
            mutate(mutatedEndpoint);
            return { ...data, ...result.data };
          } else {
            throw new Error(result.message || 'Submission failed');
          }
        },
        { revalidate: true },
      );

      closeModal(true);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {formFields}

        {error && <div className="text-red-500">{error}</div>}

        <Button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center"
        >
          {loading ? (
            <Spinner className="w-4 h-4" />
          ) : entity ? (
            'Actualizar'
          ) : (
            'Agregar'
          )}
        </Button>
      </form>
    </Form>
  );
}

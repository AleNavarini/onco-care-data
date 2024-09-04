import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z, ZodObject, ZodTypeAny } from 'zod';
import '@/lib/big-int-extensions';

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
import { mutate } from 'swr';
import Spinner from '../../ui/spinner';
import ZodFormSelect from './zod-form-select';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  formSchema: ZodObject<{ [key: string]: ZodTypeAny }>;
  hiddenFields?: string[];
  entity?: Partial<z.infer<ZodObject<{ [key: string]: ZodTypeAny }>>>;
  endpoint?: string;
  closeModal?: (state: boolean) => void;
  customMutate?: string;
}

export default function ZodForm({
  formSchema,
  hiddenFields = [],
  entity,
  endpoint = '',
  closeModal,
  customMutate,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mappedEntity =
    entity &&
    Object.keys(entity).reduce(
      (acc, key) => {
        if (entity[key] !== null) {
          acc[key] = entity[key];
        }
        return acc;
      },
      {} as typeof entity,
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: mappedEntity || {},
  });

  const formFields = Object.keys(formSchema.shape).map((fieldName) => {
    const isHidden = hiddenFields.includes(fieldName);
    const fieldSchema = formSchema.shape[fieldName];
    const fieldLabel = fieldSchema.description || fieldName;
    const isDate = fieldLabel.toLowerCase().includes('fecha');
    const isEnum = JSON.stringify(fieldSchema._def).includes('ZodEnum');
    const isNum = JSON.stringify(fieldSchema._def).includes('ZodNumber');

    return (
      <FormField
        key={fieldName}
        control={form.control}
        name={fieldName}
        render={({ field }) => (
          <FormItem className={isHidden ? 'hidden' : ''}>
            {isEnum && (
              <>
                <FormLabel>{fieldLabel}</FormLabel>
                <FormControl>
                  <ZodFormSelect
                    field={field}
                    fieldLabel={fieldLabel}
                    fieldSchema={fieldSchema}
                  />
                </FormControl>
                <FormDescription>
                  <p>Seleccione una opción.</p>
                </FormDescription>
              </>
            )}

            {!isEnum && (
              <>
                <FormLabel>{fieldLabel}</FormLabel>
                <FormControl>
                  <Input
                    type={isDate ? 'date' : isNum ? 'number' : 'text'}
                    {...field}
                    placeholder={fieldLabel}
                    onChange={(e) =>
                      form.setValue(
                        fieldName,
                        isNum ? e.target.valueAsNumber : e.target.value,
                      )
                    } // Handle number conversion
                  />
                </FormControl>
              </>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);

    const method = entity && entity.id ? 'PUT' : 'POST';
    const baseUrl = '/api';
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

          if (response.ok) {
            mutate(mutatedEndpoint);
            if (customMutate) {
              mutate(customMutate);
            }
            return { ...data, ...result.data };
          } else {
            throw new Error(result.message || 'Submission failed');
          }
        },
        { revalidate: true },
      );

      if (closeModal) closeModal(true);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }

  const className =
    formFields.length > 5 ? ' grid grid-cols-1 md:grid-cols-2 gap-3' : '';
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`${className} space-y-4`}
      >
        {formFields}
        {error && <div className="text-red-500">{error}</div>}

        <Button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center md:col-span-2"
        >
          {loading ? (
            <Spinner className="w-4 h-4" />
          ) : entity && entity.id ? (
            'Actualizar'
          ) : (
            'Agregar'
          )}
        </Button>
      </form>
    </Form>
  );
}

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { z } from 'zod';

interface ZodFormSelectProps {
  field: { field: any }['field'];
  fieldLabel: string;
  fieldSchema: z.ZodTypeAny;
}

export default function ZodFormSelect({
  field,
  fieldLabel,
  fieldSchema,
}: ZodFormSelectProps) {
  let values = [];
  if (fieldSchema._def.typeName === 'ZodOptional') {
    values = Object.values(fieldSchema._def.innerType._def.values);
  } else {
    values = Object.values(fieldSchema._def.values);
  }
  return (
    <Select onValueChange={field.onChange} value={field.value}>
      <SelectTrigger>
        <SelectValue placeholder={`Elija ${fieldLabel}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{fieldLabel}</SelectLabel>
          {values.map((option: string) => (
            <SelectItem key={option} value={option}>
              {option !== 'true' && option !== 'false' ? option : null}
              {option === 'true' && 'Si'}
              {option === 'false' && 'No'}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

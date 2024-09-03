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
  return (
    <Select onValueChange={field.onChange} value={field.value}>
      <SelectTrigger>
        <SelectValue placeholder={`Elija ${fieldLabel}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{fieldLabel}</SelectLabel>
          {Object.values(fieldSchema._def.values).map((option: string) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

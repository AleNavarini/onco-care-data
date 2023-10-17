import { FormControl, FormLabel, Input } from '@mui/joy';
import { capitalize } from '@mui/material';

interface Props {
  register: any;
  fieldName: string;
  placeholder?: string;
  type: string;
  label: string;
  required?: boolean;
  defaultValue?: any;
  visible?: boolean;
}
export default function Field({
  register,
  fieldName,
  placeholder,
  type,
  label,
  required = false,
  visible,
  defaultValue,
}: Props) {
  return (
    <FormControl sx={{ display: visible === false ? 'none' : 'auto' }}>
      <FormLabel
        sx={(theme) => ({
          '--FormLabel-color': theme.vars.palette.primary.plainColor,
        })}
      >
        {capitalize(label)}
      </FormLabel>
      <Input
        required={required}
        {...register(fieldName)}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
}

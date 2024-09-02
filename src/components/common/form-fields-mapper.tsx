import { Stack } from '@mui/joy';
import Field from '../forms/field';
import { FieldConfig } from '@/types/field-config';

type FormComponentProps = {
  fields: FieldConfig[];
  register: any;
};

const FormFieldsMapper: React.FC<FormComponentProps> = ({
  fields,
  register,
}) => {
  return (
    <Stack spacing={0.2}>
      {fields.map((field) => (
        <Field key={field.fieldName} register={register} {...field} />
      ))}
    </Stack>
  );
};

export default FormFieldsMapper;

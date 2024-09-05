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
    <div className='flex flex-col gap-4'>
      {fields.map((field) => (
        <Field key={field.fieldName} register={register} {...field} />
      ))}
    </div>
  );
};

export default FormFieldsMapper;

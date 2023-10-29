import FormFieldsMapper from './FormFieldsMapper';
import SubmitButton from './SubmitButton';

interface Props {
  isLoading: boolean;
  handleSubmit: any;
  onSubmit: any;
  register: any;
  fields: any;
  dimensions?: any;
  oldEntity?: any;
}
export default function NewForm({
  fields,
  handleSubmit,
  isLoading,
  onSubmit,
  register,
  oldEntity,
}: Props) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormFieldsMapper register={register} fields={fields} />
      <SubmitButton isLoading={isLoading}>
        {oldEntity ? 'Actualizar' : 'Agregar'}
      </SubmitButton>
    </form>
  );
}

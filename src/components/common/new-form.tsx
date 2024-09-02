import FormFieldsMapper from './form-fields-mapper';
import SubmitButton from './submit-button';

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

import Container from './Container';
import FormFieldsMapper from './FormFieldsMapper';
import SubmitButton from './SubmitButton';

interface Props {
  isLoading: boolean;
  handleSubmit: any;
  onSubmit: any;
  register: any;
  fields: any;
  buttonText: string;
  dimensions?: any;
}
export default function Form({
  buttonText,
  fields,
  handleSubmit,
  isLoading,
  onSubmit,
  register,
  dimensions = getContainerDimensions(),
}: Props) {
  return (
    <Container dimensions={dimensions} isLoading={isLoading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormFieldsMapper register={register} fields={fields} />
        <SubmitButton isLoading={isLoading}>{buttonText}</SubmitButton>
      </form>
    </Container>
  );
}

function getContainerDimensions() {
  const width = {
    sm: '90%',
    md: '60%',
    lg: '50%',
    xl: '30%',
  };
  const maxHeight = '95%';
  const overflow = 'scroll';
  const dimensions = { width, maxHeight, overflow };
  return dimensions;
}

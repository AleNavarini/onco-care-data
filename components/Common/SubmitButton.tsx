import { Button } from '@mui/joy';

interface Props {
  children: React.ReactNode;
  isLoading: boolean;
}
export default function SubmitButton({ children, isLoading }: Props) {
  return (
    <Button
      loading={isLoading}
      sx={{
        my: 2,
        width: '100%',
      }}
      variant="solid"
      type="submit"
    >
      {children}
    </Button>
  );
}

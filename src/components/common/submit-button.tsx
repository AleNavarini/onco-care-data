import { Button } from '../ui/button';

interface Props {
  children: React.ReactNode;
  isLoading: boolean;
}
export default function SubmitButton({ children, isLoading }: Props) {
  return (
    <Button className="w-full mt-2" type="submit">
      {children}
    </Button>
  );
}

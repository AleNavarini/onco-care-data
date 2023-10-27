import { Chip, ColorPaletteProp } from '@mui/joy';

interface Props {
  status: string;
}
export default function StatusChip({ status }: Props) {
  return (
    <Chip
      color={
        {
          Activa: 'success',
          'En seguimiento': 'primary',
        }[getStatus(status)] as ColorPaletteProp
      }
      variant="soft"
      size="lg"
    >
      {getStatus(status)}
    </Chip>
  );
}

function getStatus(status: string) {
  if (status === 'following') return 'En seguimiento';
  return 'Activa';
}

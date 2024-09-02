import { getStatus } from '@/utils/get-status';
import { Chip, ColorPaletteProp } from '@mui/joy';

interface Props {
  status: string;
  size?: 'md' | 'lg';
}

export default function StatusChip({ status, size = 'md' }: Props) {
  return (
    <Chip
      color={
        {
          Activa: 'success',
          'En seguimiento': 'primary',
        }[getStatus(status)] as ColorPaletteProp
      }
      variant="soft"
      size={size}
    >
      {getStatus(status)}
    </Chip>
  );
}

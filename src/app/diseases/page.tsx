'use client';
import { Sheet } from '@mui/joy';

export default function ManagePage() {
  return (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: {
          sm: 'column',
          md: 'row',
        },
        borderRadius: 'md',
      }}
    >
      Trabajo en progreso
    </Sheet>
  );
}

import React from 'react';
import { Sheet } from '@mui/joy';

interface CenteredPageProps {
  children: React.ReactNode;
}

export default function CenteredPage({ children }: CenteredPageProps) {
  return (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Sheet>
  );
}

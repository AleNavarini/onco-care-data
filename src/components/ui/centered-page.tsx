import React from 'react';
import { Sheet } from '@mui/joy';

interface CenteredPageProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
}

export default function CenteredPage({
  children,
  width = '100%',
  height = '100%',
}: CenteredPageProps) {
  return (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Sheet>
  );
}

import { Box, Sheet } from '@mui/joy';
import LoadingOverlay from './LoadingOverlay';
import { ReactNode } from 'react';

interface Props {
  isLoading: boolean;
  children: ReactNode;
}
export default function Container({ isLoading, children }: Props) {
  return (
    <Box sx={{ position: 'relative' }}>
      {isLoading && <LoadingOverlay />}
      <Sheet
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 'md',
          px: 2,
          py: 1,
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        }}
      >
        {children}
      </Sheet>
    </Box>
  );
}

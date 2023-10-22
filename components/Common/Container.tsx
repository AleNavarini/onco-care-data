import { Box, Sheet } from '@mui/joy';
import LoadingOverlay from './LoadingOverlay';
import { ReactNode } from 'react';

interface Props {
  isLoading: boolean;
  children: ReactNode;
  dimensions?: any;
}
export default function Container({
  isLoading,
  children,
  dimensions = getContainerDimensions(),
}: Props) {
  return (
    <Box
      sx={{
        ...dimensions,
        position: 'relative',
        overflow: 'auto',
      }}
    >
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

function getContainerDimensions() {
  const width = {
    sm: '90%',
    md: '60%',
    lg: '50%',
    xl: '30%',
  };
  const dimensions = { width };
  return dimensions;
}

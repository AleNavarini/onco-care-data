import React from 'react';
import { CircularProgress } from '@mui/joy';
import CenteredPage from './centered-page';

interface CenteredLoadingProps {
  width?: string;
  height?: string;
}

export default function CenteredLoading({ width, height }: CenteredLoadingProps) {
  return (
    <CenteredPage width={width} height={height}>
      <CircularProgress />
    </CenteredPage>
  );
}

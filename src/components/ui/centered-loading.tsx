import React from 'react';
import CenteredPage from './centered-page';
import Spinner from './spinner';

interface CenteredLoadingProps {
  width?: string;
  height?: string;
}

export default function CenteredLoading({
  width,
  height,
}: CenteredLoadingProps) {
  return (
    <CenteredPage width={width} height={height}>
      <Spinner />
    </CenteredPage>
  );
}

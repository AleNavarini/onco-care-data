import React from 'react';

interface CenteredPageProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
}

export default function CenteredPage({
  children,
  width = 'w-full',
  height = 'h-full',
}: CenteredPageProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${width} ${height}`}
    >
      {children}
    </div>
  );
}

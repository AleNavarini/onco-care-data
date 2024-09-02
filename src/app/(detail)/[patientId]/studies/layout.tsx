'use client';
import Header from '@/components/common/header';
import MainContent from '@/components/common/main-content';
import FirstSidebar from '@/components/common/FirstSidebar';
import React from 'react';
import SecondSidebar from '@/components/common/second-sidebar';
import { Box } from '@mui/joy';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Header />
        <FirstSidebar />
        <SecondSidebar />
        <MainContent>{children}</MainContent>
      </Box>
    </React.Fragment>
  );
}

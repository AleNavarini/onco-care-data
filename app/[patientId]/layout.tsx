'use client';
import Header from '@/components/Common/Header';
import MainContent from '@/components/Common/MainContent';
import FirstSidebar from '@/components/Common/FirstSidebar';
import React from 'react';
import SecondSidebar from '@/components/Common/SecondSidebar';
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

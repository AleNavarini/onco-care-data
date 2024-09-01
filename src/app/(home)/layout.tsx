'use client';
import Header from '@/components/Common/Header';
import MainContent from '@/components/Common/MainContent';
import FirstSidebar from '@/components/Common/FirstSidebar';
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <Header />
      <FirstSidebar />
      <MainContent>{children}</MainContent>
    </React.Fragment>
  );
}

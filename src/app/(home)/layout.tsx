'use client';
import Header from '@/components/common/Header';
import MainContent from '@/components/common/MainContent';
import FirstSidebar from '@/components/common/FirstSidebar';
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

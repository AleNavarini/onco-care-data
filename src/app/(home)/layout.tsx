'use client';
import FirstSidebar from '@/components/common/first-sidebar';
import Header from '@/components/common/header';
import MainContent from '@/components/common/main-content';
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

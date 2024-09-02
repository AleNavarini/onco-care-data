'use client';
import Header from '@/components/common/header';
import MainContent from '@/components/common/main-content';
import FirstSidebar from '@/components/common/first-sidebar';
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

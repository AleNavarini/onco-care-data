'use client';
import FirstSidebar from '@/components/common/first-sidebar';
import Header from '@/components/common/header';
import MainContent from '@/components/common/main-content';
import React, { useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  return (
    <React.Fragment>
      <div className="flex h-screen">
        <Header toggleSidebar={toggleSidebar} />
        {(isOpen || !isMobile) && <FirstSidebar />}
        <MainContent>{children}</MainContent>
      </div>
    </React.Fragment>
  );
}

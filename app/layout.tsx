'use client';

import Navbar from '@/components/Common/Navbar';
import './globals.css';
import { Box } from '@mui/joy';
import { Public_Sans } from 'next/font/google';
import Header from '@/components/Common/Header';
import MainContent from '@/components/Common/MainContent';
import ClientCssVarsProvider from '@/components/Providers/ClientCssVarsProvider';
import NextAuthProvider from '@/components/Providers/NextAuthProvider';
const publicSans = Public_Sans({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <ClientCssVarsProvider>
        <html lang="en">
          <head>
            <title>Onco-Care-Data</title>
          </head>
          <body className={`${publicSans.className} body-class`}>
            <Header />
            <Navbar />
            <MainContent>{children}</MainContent>
          </body>
        </html>
      </ClientCssVarsProvider>
    </NextAuthProvider>
  );
}

'use client';

import './globals.css';
import '@/lib/big-int-extensions';
import { Public_Sans } from 'next/font/google';
import ClientCssVarsProvider from '@/components/providers/client-css-vars-provider';
import NextAuthProvider from '@/components/providers/next-auth-provider';
import FirstSidebar from '@/components/common/first-sidebar';
import Header from '@/components/common/header';
import MainContent from '@/components/common/main-content';
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
            <FirstSidebar />
            <MainContent>{children}</MainContent>
          </body>
        </html>
      </ClientCssVarsProvider>
    </NextAuthProvider>
  );
}

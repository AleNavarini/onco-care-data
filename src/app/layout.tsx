'use client';

import './globals.css';
import '@/lib/bigIntExtensions';
import { Public_Sans } from 'next/font/google';
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
            {children}
          </body>
        </html>
      </ClientCssVarsProvider>
    </NextAuthProvider>
  );
}

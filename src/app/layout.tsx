'use client';

import NextAuthProvider from '@/components/providers/next-auth-provider';
import './globals.css';
import { Public_Sans } from 'next/font/google';
import ClientCssVarsProvider from '@/components/providers/client-css-vars-provider';
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
          <body
            className={`${publicSans.className} bg-gray-100 dark:bg-gray-800`}
          >
            {children}
          </body>
        </html>
      </ClientCssVarsProvider>
    </NextAuthProvider>
  );
}

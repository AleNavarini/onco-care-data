'use client';

import NextAuthProvider from '@/components/providers/next-auth-provider';
import './globals.css';
import { Public_Sans } from 'next/font/google';
const publicSans = Public_Sans({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <html lang="en">
        <head>
          <title>Onco-Care-Data</title>
        </head>
        <body className={`${publicSans.className}`}>{children}</body>
      </html>
    </NextAuthProvider>
  );
}

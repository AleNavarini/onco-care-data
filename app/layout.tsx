'use client'

import Navbar from '@/components/Navbar';
import './globals.css'
import { Box } from '@mui/joy';
import { Public_Sans } from 'next/font/google'
import Header from '@/components/Header';
import { NextAuthProvider } from '@/components/NextAuthProvider';
import MainContent from '@/components/MainContent';
import ClientCssVarsProvider from "@/components/Providers/ClientCssVarsProvider";
const publicSans = Public_Sans({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <NextAuthProvider>
      <ClientCssVarsProvider>

        <html lang="en">
          <head>
            <title>Onco-Care-Data</title>
          </head>
          <body className={publicSans.className}>
            <Box sx={{
              display: 'flex',
              minHeight: '100dvh',
              overflow: 'hidden'
            }}>
              <Header />
              <Navbar />
              <MainContent>
                {children}
              </MainContent>
            </Box>
          </body>
        </html>
      </ClientCssVarsProvider>
    </NextAuthProvider >
  )
}

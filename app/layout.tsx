'use client'
import Navbar from '@/components/Navbar';
import './globals.css'
import { Box, CssVarsProvider } from '@mui/joy';
import { Public_Sans } from 'next/font/google'
import Header from '@/components/Header';
import { NextAuthProvider } from '@/components/NextAuthProvider';
import MainContent from '@/components/MainContent';
import { Metadata } from 'next';
const publicSans = Public_Sans({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Profile Page',
  description: 'Profile page'
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <NextAuthProvider>
      <CssVarsProvider
        defaultMode="system"
        modeStorageKey="theme-mode"
        disableNestedContext
      >
        <html lang="en">
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
      </CssVarsProvider >
    </NextAuthProvider >
  )
}

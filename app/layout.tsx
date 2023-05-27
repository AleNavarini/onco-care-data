'use client'
import Navbar from '@/components/Navbar';
import './globals.css'
import { Box, CssVarsProvider, GlobalStyles, Sheet } from '@mui/joy';
import { Public_Sans } from 'next/font/google'
import { Metadata } from 'next';

const publicSans = Public_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Onco-Care-Data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <CssVarsProvider
      defaultMode="system"
      modeStorageKey="theme-mode"
      disableNestedContext
    >
      <GlobalStyles
        styles={{
          '[data-feather], .feather': {
            color: 'var(--Icon-color)',
            margin: 'var(--Icon-margin)',
            fontSize: 'var(--Icon-fontSize, 20px)',
            width: '1em',
            height: '1em',
          },
        }}
      />
      <html lang="en">
        <body className={publicSans.className}>
          <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
            <Navbar />
            <Sheet sx={{ minWidth: '95dvw', px: 2, py: 2 }}>
              {children}
            </Sheet>
          </Box>
        </body>
      </html>
    </CssVarsProvider >
  )
}

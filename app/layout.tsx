'use client'
import Navbar from '@/components/Navbar';
import './globals.css'
import { Box, CssVarsProvider, GlobalStyles, Sheet } from '@mui/joy';
import { Public_Sans } from 'next/font/google'
import Header from '@/components/Header';

const publicSans = Public_Sans({ subsets: ['latin'] })

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
      <html lang="en">
        <body className={publicSans.className}>
          <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
            <Header />
            <Navbar />
            <Sheet sx={{
              minWidth: '100%',
              px: 2,
              py: {
                xs: 8,
                md: 2
              }
            }
            } >
              {children}
            </Sheet>
          </Box>
        </body>
      </html>
    </CssVarsProvider >
  )
}

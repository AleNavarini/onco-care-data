'use client'
import { Box, Typography } from '@mui/joy'
import { Metadata } from 'next';
import Head from 'next/head'

export const metadata: Metadata = {
  title: '...',
};

export default function Home() {
  return (
    <Box>
      <Head>
        <title>Onco-Care-Data | Pacientes</title>
      </Head>
      <Typography level="h4" component="h1">
        Welcome!
      </Typography>
    </Box>
  )
}

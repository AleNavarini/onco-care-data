'use client'
import { Box, Typography } from '@mui/joy'
import Head from 'next/head'


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

'use client'
import { Box, Typography } from '@mui/joy'
import { useSession } from 'next-auth/react'
import Head from 'next/head'


export default function Home() {
  const session = useSession()
  return (
    <Box>
      <Head>
        <title>Onco-Care-Data | Pacientes</title>
      </Head>
      <Typography level="h4" component="h1">
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </Typography>
    </Box>
  )
}

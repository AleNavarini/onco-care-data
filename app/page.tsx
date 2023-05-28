'use client'

import PatientsDashboard from '@/components/PatientsDashboard'
import { Box, Typography } from '@mui/joy'
import { use } from 'react'

async function getPatients() {
  const res = await fetch('/api/patients')
  return res.json()
}

const patientsPromise = getPatients()


export default function Home() {
  const data = use(patientsPromise)
  return (
    <Box>
      <Typography level="h1">
        Main page
      </Typography>
      <PatientsDashboard
        patients={data.patients}
      />
      <div>
        {JSON.stringify(data)}
      </div>
    </Box>
  )
}
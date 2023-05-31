'use client'

import useSWR from 'swr';
import { Box, LinearProgress, Typography } from '@mui/joy'
import PatientsDashboard from '@/components/Dashboards/PatientsDashboard';

const getPatients = async () => {
  const response = await fetch(`/api/patients?detailed=true`);
  const data = await response.json();
  return data;
};



export default function Home() {
  const { data, error } = useSWR('/api/patients?detailed=true', getPatients, { refreshInterval: 1000 });

  let content = <LinearProgress sx={{ marginY: 10 }} />
  if (data) content = <PatientsDashboard patients={data.patients} />
  if (error) content = <Typography level='h3'>Ha habido un error...</Typography>

  return (
    <Box>
      <Typography level="h2" sx={{ ml: 5 }}>
        Pacientes
      </Typography>
      {content}
    </Box>
  )
}
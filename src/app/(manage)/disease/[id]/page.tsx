'use client';
import RiskFactorsDashboard from '@/components/dashboards/risk-factor-dashboard';
import { LinearProgress, Sheet, Typography } from '@mui/joy';
import useSWR from 'swr';

interface Props {
  params: {
    id: string;
  };
}

const getDisease = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default function DiseasePage({ params }: Props) {
  const id = params.id;
  const { data, isLoading, error } = useSWR(`/api/diseases/${id}`, getDisease, {
    refreshInterval: 5000,
  });

  if (isLoading) {
    return <LinearProgress />;
  }

  if (error) {
    return <h1>Ha habido un error ...</h1>;
  }

  return (
    <>
      <Typography level="h2">
        Factores de riesgo - <b>{data.disease.name}</b>
      </Typography>
      <Sheet
        sx={{
          width: '90%',
          mx: 'auto',
          borderRadius: 'md',
          overflow: 'auto',
          my: 2,
        }}
        variant={'outlined'}
      >
        <RiskFactorsDashboard
          forPatient={false}
          riskFactors={data.disease.riskFactors}
          diseaseId={data.disease.id}
        />
      </Sheet>
    </>
  );
}

import {
  Box,
  Typography,
  Select,
  Chip,
  Sheet,
  LinearProgress,
  Option,
  ColorPaletteProp,
} from '@mui/joy';
import { Disease } from '@prisma/client';
import { useState } from 'react';
import useSWR, { mutate } from 'swr';

type ApiCallParams = {
  url: string;
  method: 'PUT' | 'POST';
  submitData: any;
};

const apiCall = async ({ url, method, submitData }: ApiCallParams) => {
  let response;
  try {
    response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submitData),
    });
    if (response.status !== 200) throw new Error('Request failed');
  } catch (error) {
    console.error('Fetch error: ', error);
  }
  return response;
};

const getDiseases = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

interface Props {
  patient: any;
}

export default function PatientTopRow({ patient }: Props) {
  const [loading, setLoading] = useState(false);
  const { data } = useSWR(`/api/diseases`, getDiseases, {
    refreshInterval: 5000,
  });

  const handleChange = async (_e: null, value: string) => {
    const proceed: boolean = window.confirm(
      'Deseas cambiar la enfermedad? Esto va a borrar los factores de riesgos cargados si ya los hay',
    );
    if (!proceed) return;

    const submitData: any = { name: value, patientId: patient.id };
    setLoading(true);
    if (patient.disease) {
      submitData.deleteRiskFactors = true;
      const response = await apiCall({
        url: `/api/patient-disease`,
        method: 'PUT',
        submitData,
      });
      if (response) await mutate(`/api/patients/${patient.id}?detailed=true`);
    } else {
      const response = await apiCall({
        url: `/api/diseases`,
        method: 'POST',
        submitData,
      });
      if (response) await mutate(`/api/patients/${patient.id}?detailed=true`);
    }
    setLoading(false);
  };
  function getStatus() {
    if (patient.status === 'following') return 'En seguimiento';
    return 'Activa';
  }
  const filteredDiseases = data?.diseases?.filter(
    (d: Disease) => d.patientId === null,
  );
  return (
    <Box
      sx={{
        display: 'flex',
        width: {
          sm: '100%',
          md: '90%',
        },
        justifyContent: 'space-between',
      }}
    >
      {loading && (
        <Sheet
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            mx: 'auto',
            height: '100dvh',
            zIndex: 2222222,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LinearProgress />
        </Sheet>
      )}
      <Typography sx={{ width: 'fit-content' }} level="h2">
        {patient.name}
      </Typography>
      <Select
        //@ts-ignore
        onChange={handleChange}
        sx={{
          width: {
            sm: 'auto',
            md: '20dvw',
          },
        }}
        placeholder="Choose one…"
        defaultValue={patient?.disease?.name}
      >
        {filteredDiseases?.map((disease: Disease) => (
          <Option key={disease.id.toString()} value={disease.name}>
            {disease.name}
          </Option>
        ))}
      </Select>
      <Chip
        sx={{
          ml: 1,
          textAlign: 'center',
        }}
        color={
          {
            Activa: 'success',
            'En seguimiento': 'primary',
          }[getStatus()] as ColorPaletteProp
        }
        variant="soft"
        size="lg"
      >
        {getStatus()}
      </Chip>
    </Box>
  );
}

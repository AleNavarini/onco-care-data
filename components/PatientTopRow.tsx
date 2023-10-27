import fetcher from '@/utils/fetcher';
import { Box, Typography } from '@mui/joy';
import useSWR from 'swr';
import DiseaseSelect from './DiseaseSelect';
import StatusChip from './StatusChip';

interface Props {
  patientId: any;
}

export default function PatientTopRow({ patientId }: Props) {
  const { data: diseasesData } = useSWR(`/api/diseases`, fetcher, {
    suspense: true,
  });
  const { data: patientData } = useSWR(
    `/api/patients/${patientId}?detailed=true`,
    fetcher,
    { suspense: true },
  );
  const patient = patientData.patient;
  const diseases = diseasesData.diseases;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 1,
        width: {
          sm: '100%',
          md: '90%',
        },
      }}
    >
      <Typography level="h2">{patient.name}</Typography>
      <DiseaseSelect
        patient={patient}
        diseases={diseases}
        defaultValue={patient.disease?.name}
      />
      <StatusChip status={patient.status} size="lg" />
    </Box>
  );
}

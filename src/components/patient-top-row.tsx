import fetcher from '@/utils/fetcher';
import { Box, Typography } from '@mui/joy';
import useSWR from 'swr';
import DiseaseSelect from './disease-select';
import StatusChip from './status-chip';

interface Props {
  patientId: any;
}

export default function PatientTopRow({ patientId }: Props) {
  const { data: diseasesData } = useSWR(`/api/v1/diseases`, fetcher, {
    suspense: true,
  });
  const { data: patientData } = useSWR(
    `/api/v1/patients/${patientId}?detailed=true`,
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

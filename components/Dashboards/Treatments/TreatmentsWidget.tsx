import AddButton from '@/components/Common/AddButton';
import { Box, Typography } from '@mui/joy';
import StudiesDashboard from './TreatmentsDashboard';
import StudyForm from '@/components/Forms/StudyForm';
import TreatmentForm from '@/components/Forms/TreatmentForm';

interface TreatmentsWidgetProps {
  patientId: string;
  width?: number;
}
export default function TreatmentsWidget({
  patientId,
  width = 100,
}: TreatmentsWidgetProps) {
  return (
    <Box
      sx={{
        width: `${width}%`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        rowGap: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography level="h3">Tratamientos</Typography>
        <AddButton
          text="Crear Tratamiento"
          form={<TreatmentForm patientId={patientId} />}
        />
      </Box>
      <StudiesDashboard patientId={patientId} />
    </Box>
  );
}

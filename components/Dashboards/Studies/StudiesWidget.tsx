import AddButton from '@/components/Common/AddButton';
import { Box, Typography } from '@mui/joy';
import StudiesDashboard from './StudiesDashboard';
import StudyForm from '@/components/Forms/StudyForm';

interface StudiesWidgetProps {
  width: number;
  patientId: string;
}
export default function StudiesWidget({
  width,
  patientId,
}: StudiesWidgetProps) {
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
        <Typography level="h3">Estudios</Typography>
        <AddButton
          text="Crear Estudio"
          form={<StudyForm patientId={patientId} />}
        />
      </Box>
      <StudiesDashboard patientId={patientId} />
    </Box>
  );
}

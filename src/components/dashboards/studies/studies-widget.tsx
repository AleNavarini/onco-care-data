import AddButton from '@/components/common/add-button';
import { Box, Typography } from '@mui/joy';
import StudiesDashboard from './studies-dashboard';
import StudyForm from '@/components/forms/StudyForm';

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

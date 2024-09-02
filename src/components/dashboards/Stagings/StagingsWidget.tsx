import AddButton from '@/components/common/AddButton';
import { Box, Typography } from '@mui/joy';
import FollowUpsDashboard from './StagingsDashboard';
import StagingForm from '@/components/forms/StagingForm';

interface FollowUpWidgetProps {
  width: number;
  patientId: string;
}
export default function FollowUpWidget({
  width,
  patientId,
}: FollowUpWidgetProps) {
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
        <Typography level="h3">Estadificaciones</Typography>
        <AddButton
          text="Crear Estadificación"
          form={<StagingForm patientId={patientId} />}
        />
      </Box>
      <FollowUpsDashboard patientId={patientId} />
    </Box>
  );
}

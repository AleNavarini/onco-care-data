import AddButton from '@/components/common/add-button';
import { Box, Typography } from '@mui/joy';
import FollowUpsDashboard from './stagings-dashboard';
import StagingForm from '@/components/forms/staging-form';

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
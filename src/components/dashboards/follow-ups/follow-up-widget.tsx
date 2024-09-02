import AddButton from '@/components/common/add-button';
import FollowUpForm from '@/components/forms/follow-up-form';
import { Box, Typography } from '@mui/joy';
import FollowUpsDashboard from './follow-ups-dashboard';

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
        <Typography level="h3">Seguimientos</Typography>
        <AddButton
          text="Crear Seguimiento"
          form={<FollowUpForm patientId={patientId} />}
        />
      </Box>
      <FollowUpsDashboard patientId={patientId} />
    </Box>
  );
}

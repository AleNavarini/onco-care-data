import AddButton from '@/components/common/AddButton';
import FollowUpForm from '@/components/forms/FollowUpForm';
import { Box, Typography } from '@mui/joy';
import FollowUpsDashboard from './FollowUpsDashboard';

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

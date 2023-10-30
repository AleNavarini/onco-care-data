'use client';
import AddButton from '@/components/Common/AddButton';
import FollowUpsDashboard from '@/components/Dashboards/FollowUps/FollowUpsDashboard';
import FollowUpForm from '@/components/Forms/FollowUpForm';
import { Box, Sheet, Typography } from '@mui/joy';

interface DashboardsPageProps {
  params: {
    patientId: string;
  };
}
const GAP = 2;
export default function DashboardsPage({ params }: DashboardsPageProps) {
  const { patientId } = params;
  const width = 50 - GAP / 2;
  return (
    <Sheet
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        justifyContent: 'space-between',
      }}
    >
      <FollowUpWidget width={width} patientId={patientId}/>
      <FollowUpWidget width={width} patientId={patientId}/>
      <FollowUpWidget width={width} patientId={patientId}/>
      <FollowUpWidget width={width} patientId={patientId}/>
      
    </Sheet>
  );
}
interface FollowUpWidgetProps {
  width: number;
  patientId: string;
}
function FollowUpWidget({ width, patientId }: FollowUpWidgetProps) {
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

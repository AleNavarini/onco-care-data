import FollowUpsDashboard from '@/components/Dashboards/FollowUps/FollowUpsDashboard';
import { Sheet } from '@mui/joy';

interface DashboardsPageProps {
  params: {
    patientId: string;
  };
}

export default function DashboardsPage({ params }: DashboardsPageProps) {
  const { patientId } = params;
  return (
    <Sheet
      sx={{
        display: 'flex',
        gap: 3,
        rowGap: 3,
      }}
    >
      <FollowUpsDashboard patientId={patientId} />
    </Sheet>
  );
}

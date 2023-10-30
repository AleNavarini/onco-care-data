'use client';
import FollowUpWidget from '@/components/Dashboards/FollowUps/FollowUpWidget';
import { Sheet } from '@mui/joy';

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
      <FollowUpWidget width={width} patientId={patientId} />
      <FollowUpWidget width={width} patientId={patientId} />
      <FollowUpWidget width={width} patientId={patientId} />
      <FollowUpWidget width={width} patientId={patientId} />
    </Sheet>
  );
}

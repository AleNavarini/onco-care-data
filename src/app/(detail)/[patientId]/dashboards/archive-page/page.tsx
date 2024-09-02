'use client';
import FollowUpWidget from '@/components/dashboards/follow-ups/FollowUpWidget';
import StagingsWidget from '@/components/dashboards/stagings/StagingsWidget';
import { Sheet } from '@mui/joy';

interface DashboardsPageProps {
  params: {
    patientId: string;
  };
}
const GAP = 2;
const WIDTH = 50 - GAP / 2;
export default function DashboardsPage({ params }: DashboardsPageProps) {
  const { patientId } = params;
  return (
    <Sheet
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        justifyContent: 'space-between',
        placeItems: 'flex-start',
      }}
    >
      <FollowUpWidget width={WIDTH} patientId={patientId} />
      <StagingsWidget width={WIDTH} patientId={patientId} />
    </Sheet>
  );
}

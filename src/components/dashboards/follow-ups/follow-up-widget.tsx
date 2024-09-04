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
    <div className="flex flex-col items-end gap-2">
      <div className="flex justify-between w-full">
        <p>Seguimientos</p>
        <AddButton
          text="Crear Seguimiento"
          form={<FollowUpForm patientId={patientId} />}
        />
      </div>
      <FollowUpsDashboard patientId={patientId} />
    </div>
  );
}

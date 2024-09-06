import AddButton from '@/components/common/add-button';
import FollowUpForm from '@/components/forms/follow-up-form';
import FollowUpsDashboard from './follow-ups-dashboard';

interface FollowUpWidgetProps {
  patientId: string;
}
export default function FollowUpWidget({ patientId }: FollowUpWidgetProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex justify-between w-full items-center">
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

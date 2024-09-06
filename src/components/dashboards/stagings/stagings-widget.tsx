import AddButton from '@/components/common/add-button';
import StagingsDashboard from './stagings-dashboard';
import StagingForm from '@/components/forms/staging-form';

interface FollowUpWidgetProps {
  patientId: string;
}
export default function FollowUpWidget({ patientId }: FollowUpWidgetProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex justify-between w-full items-center">
        <p>Estadificaciones</p>
        <AddButton
          text="Crear Estadificación"
          form={<StagingForm patientId={patientId} />}
        />
      </div>
      <StagingsDashboard patientId={patientId} />
    </div>
  );
}

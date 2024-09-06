import { Patient } from '@prisma/client';

interface MissingFollowUpAlertProps {
  patient: Patient;
}

const MissingFollowUpAlert: React.FC<MissingFollowUpAlertProps> = ({
  patient,
}) => {
  return (
    <div className="p-2 mb-2 bg-yellow-300 border rounded-md dark:bg-yellow-800">
      <p className="font-bold">{patient.name} necesita un seguimiento</p>
      {patient.email && <p>Email: {patient.email}</p>}
      {patient.phone && <p>Telefono: {patient.phone}</p>}
    </div>
  );
};

export default MissingFollowUpAlert;

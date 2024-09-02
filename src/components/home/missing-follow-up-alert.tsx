import { Patient } from '@prisma/client';

interface MissingFollowUpAlertProps {
  patient: Patient;
}

const MissingFollowUpAlert: React.FC<MissingFollowUpAlertProps> = ({
  patient,
}) => {
  return (
    <div className='p-2 mb-2 text-yellow-800 bg-yellow-200 border rounded-md dark:bg-yellow-600 dark:text-yellow-100'>
      <p className='font-bold'>
        {patient.name} necesita un seguimiento
      </p>
      {patient.email && <p>Email: {patient.email}</p>}
      {patient.phone && <p>Telefono: {patient.phone}</p>}
    </div>
  );
};

export default MissingFollowUpAlert;

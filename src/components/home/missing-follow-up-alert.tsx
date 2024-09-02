import { Alert, Typography } from '@mui/joy';
import { Patient } from '@prisma/client';

interface MissingFollowUpAlertProps {
  patient: Patient;
}

const MissingFollowUpAlert: React.FC<MissingFollowUpAlertProps> = ({
  patient,
}) => {
  return (
    <Alert variant="soft" color="warning" sx={{ mb: 2 }}>
      <Typography fontWeight="bold">
        {patient.name} necesita un seguimiento
      </Typography>
      {patient.email && <Typography>Email: {patient.email}</Typography>}
      {patient.phone && <Typography>Telefono: {patient.phone}</Typography>}
    </Alert>
  );
};

export default MissingFollowUpAlert;

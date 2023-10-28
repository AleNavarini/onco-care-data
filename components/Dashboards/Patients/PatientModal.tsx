import { IconButton, Modal } from '@mui/joy';
import PatientForm from '../../Forms/PatientForm';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  buttonText: string;
  onIconClick: () => void;
  icon: 'edit' | 'new';
  isOpen: boolean;
  onModalClose: () => void;
  setModalOpen: any;
  handler?: any;
  patient?: any;
}

const PatientModal = ({
  buttonText,
  onIconClick,
  icon,
  isOpen,
  onModalClose,
  setModalOpen,
  handler,
  patient,
}: Props) => {
  return (
    <>
      <IconButton color="neutral" variant="plain" onClick={onIconClick}>
        {icon === 'edit' ? <EditIcon /> : <AddBoxIcon />}
      </IconButton>
      <Modal
        aria-labelledby="Update patient modal"
        aria-describedby="Update patient form"
        open={isOpen}
        onClose={onModalClose}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <PatientForm
          handler={handler}
          setModalOpen={setModalOpen}
          oldPatient={patient}
        />
      </Modal>
    </>
  );
};

export default PatientModal;

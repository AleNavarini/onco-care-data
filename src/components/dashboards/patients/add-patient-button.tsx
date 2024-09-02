import Modal from '@/components/common/modal';
import PatientForm from '@/components/forms/patient-form';
import useModal from '@/hooks/use-modal';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button } from '@mui/joy';
import React from 'react';
import { mutate } from 'swr';

export default function AddPatientButton() {
  const { open, openModal, closeModal, modalContent } = useModal();
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        size="md"
        startDecorator={<AddBoxIcon />}
        onClick={() =>
          openModal(
            <PatientForm
              handler={() => mutate('/api/patients')}
              setModalOpen={closeModal}
            />,
          )
        }
      >
        Crear Paciente
      </Button>
      <Modal open={open} handleClose={closeModal}>
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}

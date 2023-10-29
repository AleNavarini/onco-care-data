import Modal from '@/components/Common/Modal';
import DiseaseForm from '@/components/Forms/DiseaseForm';
import PatientForm from '@/components/Forms/PatientForm';
import useModal from '@/hooks/useModal';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button, IconButton } from '@mui/joy';
import React from 'react';
import { mutate } from 'swr';

export default function AddPatientButton() {
  const { open, openModal, closeModal, modalContent } = useModal();
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<AddBoxIcon />}
        onClick={() =>
          openModal(
            <DiseaseForm
              handler={() => mutate('/api/diseases')}
              setModalOpen={closeModal}
            />,
          )
        }
      >
        Crear Enfermedad
      </Button>
      <Modal open={open} handleClose={closeModal}>
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}

import Modal from '@/components/common/modal';
import DiseaseForm from '@/components/forms/disease-form';
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

import Modal from '@/components/common/modal';
import TreatmentTypeForm from '@/components/forms/treatment-type-form';
import useModal from '@/hooks/use-modal';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button } from '@mui/joy';
import React from 'react';
import { mutate } from 'swr';

export default function AddTreatmentTypeButton() {
  const { open, openModal, closeModal, modalContent } = useModal();
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<AddBoxIcon />}
        onClick={() =>
          openModal(
            <TreatmentTypeForm
              handler={() => mutate('/api/treatment-types')}
              setModalOpen={closeModal}
            />,
          )
        }
      >
        Crear Tipo de Tratamiento
      </Button>
      <Modal open={open} handleClose={closeModal}>
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}
import Modal from '@/components/common/modal';
import DiseaseForm from '@/components/forms/disease-form';
import { Button } from '@/components/ui/button';
import useModal from '@/hooks/use-modal';
import React from 'react';
import { mutate } from 'swr';

export default function AddPatientButton() {
  const { open, openModal, closeModal, modalContent } = useModal();
  return (
    <React.Fragment>
      <Button
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
      <Modal title='Crear Enfermedad' open={open} handleClose={closeModal}>
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}

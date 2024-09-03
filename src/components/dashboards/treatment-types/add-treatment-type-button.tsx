import Modal from '@/components/common/modal';
import TreatmentTypeForm from '@/components/forms/treatment-type-form';
import { Button } from '@/components/ui/button';
import useModal from '@/hooks/use-modal';
import React from 'react';
import { mutate } from 'swr';

export default function AddTreatmentTypeButton() {
  const { open, openModal, closeModal, modalContent } = useModal();
  return (
    <React.Fragment>
      <Button
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
      <Modal title='Crear Tipo de Tratamiento' open={open} handleClose={closeModal}>
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}

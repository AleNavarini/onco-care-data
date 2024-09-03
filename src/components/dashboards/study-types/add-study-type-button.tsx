import Modal from '@/components/common/modal';
import StudyTypeForm from '@/components/forms/study-type-form';
import { Button } from '@/components/ui/button';
import useModal from '@/hooks/use-modal';
import React from 'react';

export default function AddStudyTypeButton() {
  const { open, openModal, closeModal, modalContent } = useModal();
  return (
    <React.Fragment>
      <Button
        onClick={() => openModal(<StudyTypeForm closeModal={closeModal} />)}
      >
        Crear Estudio
      </Button>
      <Modal title="Crear Estudio" open={open} handleClose={closeModal}>
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}

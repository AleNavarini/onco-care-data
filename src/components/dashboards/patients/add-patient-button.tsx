import Modal from '@/components/common/modal';
import PatientForm from '@/components/forms/patient-form';
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
            <PatientForm
              handler={() => mutate('/api/patients')}
              setModalOpen={closeModal}
            />,
          )
        }
      >
        Crear Paciente
      </Button>
      <Modal open={open} handleClose={closeModal} title="Crear Paciente">
        {modalContent}
      </Modal>
    </React.Fragment>
  );
}
